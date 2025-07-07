import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { InputFields } from "./InputFields";

const mockSetRack = vi.fn();
const mockSetBoardWord = vi.fn();
const mockSetResult = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  global.fetch = vi.fn();
});

test("renders inputs and button", () => {
  render(
    <InputFields
      rack=""
      boardWord=""
      setRack={mockSetRack}
      setBoardWord={mockSetBoardWord}
      setResult={mockSetResult}
    />
  );
  expect(screen.getByLabelText(/rack/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/board word/i)).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /find words/i })
  ).toBeInTheDocument();
});

test("shows error if rack is empty on submit", async () => {
  render(
    <InputFields
      rack=""
      boardWord=""
      setRack={mockSetRack}
      setBoardWord={mockSetBoardWord}
      setResult={mockSetResult}
    />
  );
  fireEvent.click(screen.getByRole("button", { name: /find words/i }));
  await waitFor(() =>
    expect(mockSetResult).toHaveBeenCalledWith({
      error: "Rack must be between 1 and 7 letters.",
    })
  );
});

test("handles successful API response", async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ best_word: "HELLO", score: 24 }),
  });

  render(
    <InputFields
      rack="HELLO"
      boardWord=""
      setRack={() => {}}
      setBoardWord={() => {}}
      setResult={mockSetResult}
    />
  );

  fireEvent.click(screen.getByRole("button", { name: /find words/i }));

  await waitFor(() =>
    expect(mockSetResult).toHaveBeenCalledWith({
      best_word: "HELLO",
      score: 24,
    })
  );
});
