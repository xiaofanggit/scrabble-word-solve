import { API_BASE_URL } from "../config/api";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function InputFields({
  rack,
  setRack,
  boardWord,
  setBoardWord,
  setResult,
}) {
  const handleClear = (word) => {
    if (word === "rack") setRack("");
    else if (word === "boardWord") setBoardWord("");
    setResult(null);
  };
  const handleSubmit = async () => {
    if (rack.length < 1 || rack.length > 7) {
      setResult({ error: "Rack must be between 1 and 7 letters." });
      return;
    }
    const params = new URLSearchParams({ rack: rack, word: boardWord });
    const response = await fetch(`${API_BASE_URL}/solve?${params}`, {
      cache: "no-store",
    });
    if (!response.ok) {
      setResult({ error: "Error fetching data from server." });
      return;
    }
    const data = await response.json();
    if (data.error) {
      setResult({ error: data.error });
    } else {
      setResult({ best_word: data.best_word, score: data.score });
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      mt={4}
    >
      <TextField
        label="🎲 Rack (1-7 Letters)"
        variant="outlined"
        placeholder="Enter your rack letters"
        autoFocus
        autoComplete="off"
        value={rack}
        onChange={(e) => {
          setResult(null);
          setRack(e.target.value.toUpperCase());
        }}
        slotProps={{ inputProps: { maxLength: 7 } }}
        fullWidth
        onFocus={() => handleClear("rack")}
      />
      <TextField
        label="🧩 Board Word (optional)"
        variant="outlined"
        placeholder="Enter your board word"
        autoComplete="off"
        value={boardWord}
        onChange={(e) => {
          setResult(null);
          setBoardWord(e.target.value.toUpperCase());
        }}
        slotProps={{ inputProps: { maxLength: 7 } }}
        fullWidth
        onFocus={() => handleClear("boardWord")}
      />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleSubmit}
        fullWidth
      >
        🔍 Find Words
      </Button>
    </Box>
  );
}
