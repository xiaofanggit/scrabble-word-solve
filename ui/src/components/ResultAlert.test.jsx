import { render, screen } from "@testing-library/react";
import { ResultAlert } from "./ResultAlert";

test("renders nothing when result is null", () => {
  const { container } = render(<ResultAlert result={null} />);
  expect(container).toBeEmptyDOMElement();
});

test("renders error alert", () => {
  render(<ResultAlert result={{ error: "Test error" }} />);
  expect(screen.getByText(/❌/)).toBeInTheDocument();
  expect(screen.getByText(/test error/i)).toBeInTheDocument();
});

test("renders success alert", () => {
  render(<ResultAlert result={{ best_word: "HELLO", score: 24 }} />);
  expect(screen.getByText(/✅/)).toBeInTheDocument();
  expect(screen.getByText(/HELLO/)).toBeInTheDocument();
  expect(screen.getByText(/24/)).toBeInTheDocument();
});
test("renders nothing when result is empty array", () => {
  const { container } = render(<ResultAlert result={[]} />);
  expect(container).toBeEmptyDOMElement();
});
test("renders nothing when result is undefined", () => {
  const { container } = render(<ResultAlert result={undefined} />);
  expect(container).toBeEmptyDOMElement();
});
