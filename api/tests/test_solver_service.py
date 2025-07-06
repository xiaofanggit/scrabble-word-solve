from collections import Counter
from services.solver_service import SolverService

# Minimal test dictionary and scoring data
mock_word_counters = {
    "bat": Counter("bat"),
    "tab": Counter("tab"),
    "cat": Counter("cat"),
}
mock_tile_data = {
    "a": 9,
    "b": 2,
    "c": 2,
    "t": 6,
}
mock_scores = {
    "a": 1,
    "b": 3,
    "c": 3,
    "t": 1,
}

solver = SolverService(mock_word_counters, mock_tile_data, mock_scores)


def test_find_best_scrabble_word_normal_case():
    result = solver.find_best_scrabble_word("bat")
    assert result["best_word"] in {"bat", "tab"}
    assert result["score"] == 5

def test_find_best_scrabble_word_with_board_word():
    result = solver.find_best_scrabble_word("cat", "cat")
    assert "No valid words found." in result["error"]

def test_find_best_scrabble_word_invalid_input():
    result = solver.find_best_scrabble_word("123")
    assert "error" in result


def test_find_best_scrabble_word_too_long():
    result = solver.find_best_scrabble_word("abcdefgh", "")
    assert "error" in result


def test_tile_limit_exceeded():
    result = solver.find_best_scrabble_word("bbbbbbb", "")
    assert "error" in result
def test_empty_rack():
    result = solver.find_best_scrabble_word("")
    assert "error" in result
    assert result["error"] == "Rack must contain between 1 and 7 letters."