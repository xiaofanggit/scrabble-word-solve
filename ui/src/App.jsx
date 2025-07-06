import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import { APP_TITLE } from "./config/api";
import { InputFields } from "./components/InputFields";
import { ResultAlert } from "./components/ResultAlert";
import { FooterNote } from "./components/FooterNote";
function App() {
  const [rack, setRack] = useState("");
  const [boardWord, setBoardWord] = useState("");
  const [result, setResult] = useState(null);

  return (
    <Container maxWidth="sm" style={{ marginTop: "3rem" }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        🎯 {APP_TITLE}
      </Typography>
      <InputFields
        rack={rack}
        setRack={setRack}
        boardWord={boardWord}
        setBoardWord={setBoardWord}
        setResult={setResult}
      />
      <ResultAlert result={result} />
      <FooterNote />
    </Container>
  );
}

export default App;
