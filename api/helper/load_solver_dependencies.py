MAX_SCRABBLE_LETTERS = 15
MIN_SCRABBLE_LETTERS = 2
MAX_RACK_LETTERS = 7
MIN_RACK_LETTERS = 1
from collections import Counter
import json
def load_solver_dependencies():
    try:
        with open("assets/dictionary.txt", "r") as f:
            dictionary = set(
                word.strip().lower()
                for word in f
                if MIN_SCRABBLE_LETTERS <= len(word.strip()) <= MAX_SCRABBLE_LETTERS
                and word.strip().isalpha()
            )
        if not dictionary:
            raise ValueError("Dictionary is empty.")
    except FileNotFoundError:
        raise FileNotFoundError("Dictionary file not found. Please check the path.")

    # Cache counters for performance
    word_counters = {word: Counter(word) for word in dictionary}

    try:
        with open("assets/letter_data.json", "r") as f:
            letter_data = json.load(f)
            letter_data = {k.lower(): v for k, v in letter_data.items()}
            tile_data = {letter: v["tiles"] for letter, v in letter_data.items() if "tiles" in v}
            scores = {letter: v["score"] for letter, v in letter_data.items() if "score" in v}

        return word_counters, tile_data, scores
    except FileNotFoundError:
        raise FileNotFoundError("Letter data file not found. Please check the path.")
