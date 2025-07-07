import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { APP_TITLE } from "./config/api";
import { InputFields } from "./components/InputFields";
import { ResultAlert } from "./components/ResultAlert";
import { FooterNote } from "./components/FooterNote";

function App() {
  const [rack, setRack] = useState("");
  const [boardWord, setBoardWord] = useState("");
  const [result, setResult] = useState(null);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f4f6f8",
        px: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            padding: 4,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            align="center"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
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
        </Paper>

        <FooterNote />
      </Container>
    </Box>
  );
}

export default App;
