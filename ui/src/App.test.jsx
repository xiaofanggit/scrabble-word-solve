import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app title", () => {
  render(<App />);
  const title = screen.getByRole("heading", { name: /scrabble/i });
  expect(title).toBeInTheDocument();
});

test("renders input fields and button", () => {
  render(<App />);
  expect(screen.getByLabelText(/rack/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/board word/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /find words/i })
  ).toBeInTheDocument();
});
test("renders result alert", () => {
  render(<App />);
  const alert = screen.queryByRole("alert");
  expect(alert).not.toBeInTheDocument();
});
test("renders footer note", () => {
  render(<App />);
  const footerNote = screen.getByText(/developed by xiaofang/i);
  expect(footerNote).toBeInTheDocument();
});
