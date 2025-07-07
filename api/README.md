### 🔙 Backend - FastAPI

This is the Python backend that validates rack + board words and returns the highest scoring Scrabble word.

### 📁 Folder Structure

```
api/
├── assets/
│ ├── dictionary.txt # Clean word list (2–15 letters)
│ └── letter_data.json # Letter scores + tile counts
| └── images/
|       └──api.png
|       └──ui.png
│
├── helper/
│ └── load_solver_dependencies.py
│
├── services/
│ └── solver_service.py # Core solving logic
│
├── tests/
│ ├── test_main.py
│ ├── test_solver_service.py
│ └── init.py
│
├── Dockerfile
├── main.py # FastAPI app entry
├── Makefile
├── requirements.txt
├── dev-requirements.txt
└── .dockerignore
```

### ▶️ Run Only Backend using Python venv (No Docker)

If you prefer not to use Docker, you can run the FastAPI backend manually using Python's built-in virtual environment. **But please make sure you have python3 and pip installed in your computer locally before executing the below command.**

### 🖥️ macOS / Linux

```bash
cd api
rm -rf venv  # remove broken virtualenv in case
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install -r dev-requirements.txt
```

✅ Run:

```
./start.sh
```

Then access:

- API: http://localhost:8000
- Swagger UI (API docs): http://localhost:8000/docs

### 🪟 Windows (CMD or PowerShell)

```
cd api
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
pip install -r dev-requirements.txt
uvicorn main:app --reload --port 8000
```

Then access:

- API: http://localhost:8000
- Docs: http://localhost:8000/docs

💡 If PowerShell shows an execution policy error, run:

```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### 🚪 To exit the virtual environment, use:

```
deactivate
```

### ▶ Run tests

- Run all test files

```bash
make test
```

- Run one test file

```
pytest tests/test_main.py
```
