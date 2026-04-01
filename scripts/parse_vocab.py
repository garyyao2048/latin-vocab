#!/usr/bin/env python3
"""Parse OCR GCSE Latin vocabulary list from PDF into structured JSON."""

import json
import re
import subprocess
import sys

PDF_PATH = "/Users/gary.yao2048/Documents/Gary_IGCSE/Latin/221512-gcse-latin-j282-defined-vocabulary-list-and-restricted-vocabulary-list.pdf"
OUTPUT_PATH = "/Users/gary.yao2048/latin-vocab/src/data/vocab.json"


def extract_pdf_text():
    """Extract text from PDF using pdftotext with layout mode."""
    result = subprocess.run(
        ["pdftotext", "-layout", PDF_PATH, "-"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        print(f"Error running pdftotext: {result.stderr}", file=sys.stderr)
        sys.exit(1)
    return result.stdout


def is_header_or_junk(line):
    """Check if a line is a header, footer, or other non-data line."""
    stripped = line.strip()
    if not stripped:
        return True
    if "OCR Level" in stripped:
        return True
    if stripped.startswith("© OCR"):
        return True
    if "GCSE" in stripped and "Latin" in stripped:
        return True
    if stripped.startswith("This vocabulary list"):
        return True
    if stripped.startswith("In addition to"):
        return True
    if stripped.startswith("All other words"):
        return True
    if stripped.startswith("•"):
        return True
    if "candidates will be" in stripped:
        return True
    if "regular adverbs" in stripped:
        return True
    if "comparative and superlative" in stripped:
        return True
    if "cardinal numbers" in stripped:
        return True
    if "compound verbs" in stripped:
        return True
    if "QN:" in stripped:
        return True
    if stripped in ("J282/01 Language", "Defined Vocabulary List and Restricted Vocabulary List"):
        return True
    return False


# Known parts of speech patterns
POS_PATTERN = re.compile(
    r'\b(verb\s+\d\s+deponent|verb\s+irregular|verb\s+\d|'
    r'noun\s+\d\s+plural|noun\s+irregular|noun\s+\d|'
    r'pronoun/adjective|pronoun|adjective|adverb|'
    r'preposition|conjunction|prefix|particle)\b'
)


def find_pos_in_line(stripped):
    """Find the POS column match in a line.

    The POS column is preceded by 2+ spaces. When there are multiple matches
    (e.g. "prefix with verbs)" appearing before "preposition"), we want the
    one that's preceded by 2+ spaces and is a proper column boundary.
    We pick the LAST match that is preceded by 2+ spaces.
    """
    # Find all POS pattern matches that are preceded by 2+ spaces
    candidates = []
    for m in POS_PATTERN.finditer(stripped):
        start = m.start()
        # Check that there are 2+ spaces before this match
        if start >= 2 and stripped[start-1] == ' ' and stripped[start-2] == ' ':
            candidates.append(m)

    if not candidates:
        return None

    # Return the last valid candidate (rightmost column match)
    # But prefer ones where the text after is also preceded by spaces (meaning column)
    # In practice, the rightmost match preceded by 2+ spaces is the POS column
    return candidates[-1]


def parse_entry_line(line):
    """Parse a single vocabulary entry line from layout-mode output.

    Layout format:
     latin_word          forms_column                                  part_of_speech    meanings

    Returns dict or None if not a valid entry.
    """
    stripped = line.strip()
    if not stripped or is_header_or_junk(line):
        return None

    # Find the part-of-speech in the line
    pos_match = find_pos_in_line(stripped)

    if not pos_match:
        # Some entries have no POS (like "alii ... alii", "et ... et", "poenas do")
        if re.match(r'^[a-z]', stripped):
            return parse_special_entry(stripped)
        return None

    pos_text = pos_match.group(0)
    pos_start = pos_match.start()
    pos_end = pos_match.end()

    # Everything before POS is latin + forms
    before_pos = stripped[:pos_start].strip()
    # Everything after POS is meanings
    after_pos = stripped[pos_end:].strip()

    if not before_pos:
        return None

    # Split before_pos into latin word and forms
    # In layout mode, columns are separated by multiple spaces
    parts = re.split(r'\s{2,}', before_pos, maxsplit=1)

    if len(parts) == 2:
        latin = parts[0].strip()
        forms = parts[1].strip()
    elif len(parts) == 1:
        latin = parts[0].strip()
        forms = ""
    else:
        return None

    # Parse part of speech
    pos_info = parse_pos(pos_text)

    # Parse forms to extract gender for nouns
    gender = None
    if pos_info["partOfSpeech"] == "noun":
        gender = extract_gender(forms)

    # Parse meanings
    meanings = parse_meanings(after_pos)

    if not latin or not meanings:
        return None

    entry = {
        "latin": latin,
        "forms": forms if forms and forms != "indeclinable" else "",
        "partOfSpeech": pos_info["partOfSpeech"],
    }

    if pos_info.get("subtype"):
        entry["subtype"] = pos_info["subtype"]

    if pos_info.get("deponent"):
        entry["deponent"] = True

    if gender:
        entry["gender"] = gender

    if forms == "indeclinable":
        entry["indeclinable"] = True

    entry["meanings"] = meanings
    entry["isRestricted"] = False  # Will be set later

    return entry


def parse_special_entry(stripped):
    """Handle entries without a standard POS column in the expected position.

    These are entries like:
    - "alii … alii                                                                some … others"
    - "et ... et           indeclinable                                                    both ... and"
    - "poenas do                                                                       pay the penalty, be punished"
    - "re-                   (prefix used with verbs)               prefix            - back"
    """
    parts = re.split(r'\s{2,}', stripped)
    if len(parts) < 2:
        return None

    latin = parts[0].strip()

    # For "re-" which has "(prefix used with verbs)  prefix  - back"
    # Try to find POS in parts
    pos_info = None
    pos_idx = -1
    for i, part in enumerate(parts[1:], 1):
        m = POS_PATTERN.match(part.strip())
        if m:
            pos_info = parse_pos(m.group(0))
            pos_idx = i
            break

    if pos_info and pos_idx < len(parts) - 1:
        # Meanings are after the POS
        meanings_text = ", ".join(parts[pos_idx + 1:])
        meanings = parse_meanings(meanings_text)
        forms = ", ".join(parts[1:pos_idx]) if pos_idx > 1 else ""
    else:
        # No POS found - treat last part(s) as meaning
        meanings = parse_meanings(parts[-1])
        # Try to infer POS from the forms/context
        forms_text = " ".join(parts[1:-1]) if len(parts) > 2 else ""
        if "adverb" in forms_text.lower():
            pos_info = {"partOfSpeech": "adverb"}
            forms = forms_text
        elif "adjective" in forms_text.lower():
            pos_info = {"partOfSpeech": "adjective"}
            forms = forms_text
        else:
            pos_info = {"partOfSpeech": "phrase" if " " in latin else "other"}
            forms = ""

    if not meanings:
        return None

    entry = {
        "latin": latin,
        "forms": forms,
        "partOfSpeech": pos_info["partOfSpeech"],
    }
    if pos_info.get("subtype"):
        entry["subtype"] = pos_info["subtype"]
    if pos_info.get("deponent"):
        entry["deponent"] = True
    entry["meanings"] = meanings
    entry["isRestricted"] = False
    return entry


def parse_pos(pos_text):
    """Parse part of speech text into structured data."""
    pos_text = pos_text.strip()
    result = {}

    if "deponent" in pos_text:
        result["deponent"] = True
        pos_text = pos_text.replace("deponent", "").strip()

    if pos_text.startswith("verb"):
        result["partOfSpeech"] = "verb"
        m = re.search(r'\d', pos_text)
        if m:
            result["subtype"] = m.group(0)
        elif "irregular" in pos_text:
            result["subtype"] = "irregular"
    elif pos_text.startswith("noun"):
        result["partOfSpeech"] = "noun"
        m = re.search(r'\d', pos_text)
        if m:
            result["subtype"] = m.group(0)
        elif "irregular" in pos_text:
            result["subtype"] = "irregular"
    elif pos_text == "pronoun/adjective":
        result["partOfSpeech"] = "pronoun/adjective"
    elif pos_text == "pronoun":
        result["partOfSpeech"] = "pronoun"
    elif pos_text == "adjective":
        result["partOfSpeech"] = "adjective"
    elif pos_text == "adverb":
        result["partOfSpeech"] = "adverb"
    elif pos_text == "preposition":
        result["partOfSpeech"] = "preposition"
    elif pos_text == "conjunction":
        result["partOfSpeech"] = "conjunction"
    elif pos_text == "prefix":
        result["partOfSpeech"] = "prefix"
    elif pos_text == "particle":
        result["partOfSpeech"] = "particle"
    else:
        result["partOfSpeech"] = pos_text

    return result


def extract_gender(forms):
    """Extract gender from noun forms string like 'agri, m' or 'armorum, n plural'."""
    if not forms:
        return None
    # Look for standalone m, f, n, or "m and f"
    m = re.search(r'\b(m\s+and\s+f|[mfn])\s*(?:plural)?$', forms.strip())
    if m:
        g = m.group(1).strip()
        if g == "m and f":
            return "m/f"
        return g
    # Also check for patterns like "+ dative" at the end that might hide gender
    m = re.search(r',\s*(m\s+and\s+f|[mfn])\b', forms)
    if m:
        g = m.group(1).strip()
        if g == "m and f":
            return "m/f"
        return g
    return None


def parse_meanings(text):
    """Parse meanings string into a list."""
    text = text.strip()
    if not text:
        return []
    # Split by comma, but be careful with parenthetical expressions
    # e.g. "take, catch, capture, make (a plan)"
    # We want: ["take", "catch", "capture", "make (a plan)"]
    meanings = []
    current = ""
    paren_depth = 0
    for char in text:
        if char == '(':
            paren_depth += 1
            current += char
        elif char == ')':
            paren_depth -= 1
            current += char
        elif char == ',' and paren_depth == 0:
            if current.strip():
                meanings.append(current.strip())
            current = ""
        else:
            current += char
    if current.strip():
        meanings.append(current.strip())
    return meanings


def main():
    text = extract_pdf_text()
    lines = text.split('\n')

    # Separate defined and restricted sections
    defined_entries = []
    restricted_entries = []

    in_restricted = False
    restricted_started = False

    for line in lines:
        stripped = line.strip()

        # Detect transition to restricted list
        if "Restricted Vocabulary List" in stripped and "OCR Level" in stripped:
            in_restricted = True
            continue

        if in_restricted and stripped.startswith("This vocabulary list"):
            restricted_started = True
            continue

        if is_header_or_junk(line):
            continue

        entry = parse_entry_line(line)
        if entry:
            if in_restricted:
                restricted_entries.append(entry)
            else:
                defined_entries.append(entry)

    # Build restricted lookup set (by latin word)
    restricted_words = set()
    for e in restricted_entries:
        restricted_words.add(e["latin"])

    # Mark restricted entries in defined list
    for entry in defined_entries:
        if entry["latin"] in restricted_words:
            entry["isRestricted"] = True

    # Also handle special cases: some words appear in restricted but not defined
    # (shouldn't happen per spec, but just in case)
    defined_latin = {e["latin"] for e in defined_entries}
    for e in restricted_entries:
        if e["latin"] not in defined_latin:
            e["isRestricted"] = True
            defined_entries.append(e)

    # Sort alphabetically by latin word
    defined_entries.sort(key=lambda x: x["latin"].lstrip("-").lower())

    # Write output
    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(defined_entries, f, indent=2, ensure_ascii=False)

    # Print summary
    total = len(defined_entries)
    restricted_count = sum(1 for e in defined_entries if e["isRestricted"])

    pos_counts = {}
    for e in defined_entries:
        pos = e["partOfSpeech"]
        pos_counts[pos] = pos_counts.get(pos, 0) + 1

    print(f"Total entries: {total}")
    print(f"Restricted entries: {restricted_count}")
    print(f"\nParts of speech:")
    for pos, count in sorted(pos_counts.items(), key=lambda x: -x[1]):
        print(f"  {pos}: {count}")

    # Print first few entries as sample
    print(f"\nFirst 5 entries:")
    for e in defined_entries[:5]:
        print(f"  {json.dumps(e, ensure_ascii=False)}")

    # Check for potential issues
    no_meanings = [e for e in defined_entries if not e["meanings"]]
    if no_meanings:
        print(f"\nWARNING: {len(no_meanings)} entries with no meanings:")
        for e in no_meanings[:5]:
            print(f"  {e['latin']}")


if __name__ == "__main__":
    main()
