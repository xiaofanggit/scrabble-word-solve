# Scrabble Word Solver

## Find the highest scoring valid Scrabble word using a leter rack and optional board word.

## Prerequisites

#### Make sure docker, python3, node.js and git are installed in your local computer

## Setup

#### 0. Clone the remote github repository

```bash
git clone xzzzz
```

#### 1. Backend (Python3 + FastAPI)

```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
http://127.0.0.1:8000/docs
```

#### 2. Frontend (React + Vite)

```bash
cd client
npm install
npm run dev
```

## Execution

#### Option1:

Frontend UI access: http://localhost:5173

Input Rack and Board word, then click SOLVE button

#### Option2:

Server API access:

curl --request GET \
 --url 'http://127.0.0.1:8000/solve?rack=AIDOOR&word=QUIZ' \
 --header 'Content-Type: application/json' \
 --header 'User-Agent: insomnia/11.2.0'

Will see the result: {"best_word":"quiz","score":22}

#### Option3:

Cli access
Make sure the current path is server and python3 is installed

```bash
pwd
cd server
python3 solver.py --rack AIDOOR --word QUIZ
```

### Folder Structure

```
scrabble-word-solver/
│
├── server/                          # Python server
│   ├── solver.py                     # Core word solver logic
│   ├── dictionary.txt                # Word dictionary (filtered: 2–15 letters, no special chars)
│   ├── letter_data.json              # Letter scores and tile limits
│   └── tests/
│       └── test_solver.py            # Server unit tests using unittest
│
├── client/                         # React + Vite client
│   ├── index.html                    # Entry HTML file
│   ├── package.json                  # Frontend dependencies and scripts
│   ├── vite.config.js                # Vite config
│   ├── vitest.config.js              # Vitest test config
│   └── src/
│       ├── App.jsx                   # Main UI component
│       ├── main.jsx                  # App entry point
│       └── __tests__/
│           └── App.test.jsx          # Frontend tests using React Testing Library
│
└── README.md                         # Project overview and usage

```

💻 On MacBook Pro:
Step 1: Install Docker Desktop (if not already)
Download from: https://www.docker.com/products/docker-desktop

Install and restart your terminal after installation

Step 2: Confirm it's installed:
bash
Copy
Edit
docker --version
docker compose version
docker compose build
docker compose up

🪟 On Windows 10/11:
Step 1: Install Docker Desktop (same link)
Download & install: https://www.docker.com/products/docker-desktop

Enable WSL2 backend if prompted (for Windows)

Step 2: Confirm installation:
powershell
Copy
Edit
docker --version
docker compose version
