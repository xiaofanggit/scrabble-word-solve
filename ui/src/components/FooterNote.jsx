import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
export function FooterNote() {
  return (
    <Box mt={10} textAlign="right">
      <Typography variant="body2" color="textSecondary">
        Developed by{" "}
        <Link
          href="https://www.linkedin.com/in/xiaofang-wang-09789b11/"
          target="_blank"
          rel="noopener"
          underline="hover"
        >
          Xiaofang Wang
        </Link>
      </Typography>
    </Box>
  );
}
