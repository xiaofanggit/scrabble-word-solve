from collections import Counter
from typing import Optional
from helper.load_solver_dependencies import (MIN_RACK_LETTERS, MAX_RACK_LETTERS,
                                              MIN_SCRABBLE_LETTERS, MAX_SCRABBLE_LETTERS,) 

class SolverService:
    """
    Service to solve Scrabble words based on a given rack and optional board word.
    """
    def __init__(self, word_counters, tile_data, scores):
        self.word_counters = word_counters
        self.tile_data = tile_data
        self.scores = scores

    def validate_input(self, rack: str, board_word: str = "") -> tuple[bool, str]:
        """
        Validate rack and board word inputs.
        """
        if not rack or len(rack) < MIN_RACK_LETTERS or len(rack) > MAX_RACK_LETTERS:
            return False, "Rack must contain between 1 and 7 letters."

        if not rack.isalpha() or (board_word and not board_word.isalpha()):
            return False, "Rack and board word must contain only alphabetic characters."

        combined_length = len(rack + (board_word or ""))
        if combined_length > MAX_SCRABBLE_LETTERS or combined_length < MIN_SCRABBLE_LETTERS:
            return False, "Combined rack and board word must be between 2 and 15 letters."

        return True, ""

    def get_score(self, word: str) -> int:
        """
        Calculate score for a given word.
        """
        return sum(self.scores.get(c, 0) for c in word.lower())


    def find_best_scrabble_word(self, rack: str, board_word: Optional[str] = None) -> dict:
        """
        Find the highest scoring valid word using the given rack and optional board word.
        """
        try:
            rack = rack.lower()
            board_word = board_word.lower() if board_word else ""

            valid, message = self.validate_input(rack, board_word)
            if not valid:
                return {"error": message}

            combined_counter = Counter(rack + board_word)
            board_counter = Counter(board_word)

            # Tile limit enforcement
            for char in combined_counter:
                if combined_counter[char] > self.tile_data.get(char, 0):
                    return {"error": f"Letter '{char}' exceeds tile limit."}

            best_word = ""
            best_score = -1

            for word, word_counter in self.word_counters.items():
                # Must contain board word as substring (if provided)
                if board_word and (board_word not in word or word == board_word):
                    continue

                # Must use at least one tile from the rack
                if not any(word_counter[c] > board_counter.get(c, 0) for c in word_counter):
                    continue

                # Validate all letter counts against combined available tiles
                if all(word_counter[c] <= combined_counter.get(c, 0) for c in word_counter):
                    score = self.get_score(word)
                    if score > best_score or (score == best_score and word < best_word):
                        best_score = score
                        best_word = word

            if not best_word:
                return {"error": "No valid words found."}

            return {"best_word": best_word, "score": best_score}
        except Exception as e:
            return {"error": f"Unexpected error: {str(e)}"}