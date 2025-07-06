import logging
from fastapi import Depends, FastAPI, Query, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from fastapi import status

from fastapi.responses import JSONResponse

from helper.load_solver_dependencies import load_solver_dependencies
from services.solver_service import SolverService

app = FastAPI(
    title="Scrabble Word Solver API",
    description="Find the highest scoring valid Scrabble word using your rack and an optional board word.",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger = logging.getLogger("uvicorn.error")

# Load dependencies once at startup
word_counters, tile_data, scores = load_solver_dependencies()
solver_service = SolverService(word_counters, tile_data, scores)

# Depedency Injection for the solver service
def get_solver_service() -> SolverService:
    return solver_service

@app.get("/solve", summary="Solve the best scrabble word", tags=["Scrabble Solver"])
def solve(
    rack: str = Query(..., min_length=1, max_length=7, description="1–7 rack letters"),
    word: Optional[str] = Query(None, description="Optional board word already in play"),
    service: SolverService = Depends(get_solver_service)
):
    """
    Scrabble Solver API endpoint
    """
    try:
        return service.find_best_scrabble_word(rack, word)
    except Exception as e:
        logger.error(f"Unexpected error in /solve: {e}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"error": "Internal server error"}
        )
    

# Global exception handler
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"error": "Invalid input", "details": exc.errors()}
    )