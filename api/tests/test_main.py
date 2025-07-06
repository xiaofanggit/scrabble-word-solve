from fastapi.testclient import TestClient
from collections import Counter
from main import app, get_solver_service
from services.solver_service import SolverService

# Mock SolverService
class MockSolverService(SolverService):
    def __init__(self):
        super().__init__(
            word_counters={"bat": Counter("bat")},
            tile_data={"a": 9, "b": 2, "t": 6},
            scores={"a": 1, "b": 3, "t": 1}
        )

    def find_best_scrabble_word(self, rack: str, board_word: str = "") -> dict:
        if not rack.isalpha():
            return {"error": "Invalid input"}
        return {"best_word": "bat", "score": 5}

# Set the override BEFORE creating the client
app.dependency_overrides[get_solver_service] = lambda: MockSolverService()

client = TestClient(app)

def test_solve_valid():
    response = client.get("/solve?rack=bat")
    assert response.status_code == 200
    assert response.json() == {"best_word": "bat", "score": 5}

def test_solve_missing_rack():
    response = client.get("/solve")
    assert response.status_code == 422

def test_solve_invalid_input():
    response = client.get("/solve?rack=123")
    assert response.status_code == 200
    assert "error" in response.json()
def test_solve_with_board_word():
    response = client.get("/solve?rack=bat&word=bat")
    assert response.status_code == 200
    assert response.json() == {"best_word": "bat", "score": 5}