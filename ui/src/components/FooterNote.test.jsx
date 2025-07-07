import { render, screen } from "@testing-library/react";
import { FooterNote } from "./FooterNote";
test("renders footer note", () => {
  render(<FooterNote />);
  const footerNote = screen.getByText(/developed by xiaofang wang/i);
  expect(footerNote).toBeInTheDocument();
});
