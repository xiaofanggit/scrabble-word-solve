import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
export function ResultAlert({ result }) {
  if (!result || result.length === 0) {
    return null;
  }

  return (
    result && (
      <Box mt={4} textAlign="center">
        {result.error ? (
          <Alert severity="error">❌ {result.error}</Alert>
        ) : (
          <Alert severity="success">
            ✅ Found the best word: <strong>{result.best_word}</strong> - 💯
            Score: <strong>{result.score}</strong>
          </Alert>
        )}
      </Box>
    )
  );
}
