### 🎨 Frontend - React + Vite + Material UI

This is the web-based UI where players enter rack and board words to find Scrabble suggestions.

### 📁 Folder Structure

```
ui/
├── src/
│ ├── components/
│ │ ├── FooterNote.jsx
│ │ ├── FooterNote.test.jsx
│ │ ├── InputFields.jsx
│ │ ├── InputFields.test.jsx
│ │ ├── ResultAlert.jsx
│ │ └── ResultAlert.test.jsx
│ │
│ ├── config/
│ │ └── api.js # Base URL for backend
│ ├── App.jsx
│ ├── App.test.jsx
│ ├── main.jsx
│ └── setupTests.js
│
├── Dockerfile
├── .env
├── .gitignore
├── .dockerignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

### ▶️ Run Only Frontend (No Docker)

If you don't want to execute ui using docker, and have npm installed in your computer locally, please try the below:

```
cd ui
npm install
```

▶ Run:

```
npm start
```

### 🧪 Run Frontend Tests

```bash
npm run test
```
