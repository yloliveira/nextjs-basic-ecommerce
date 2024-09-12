import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./search";

const handleSubmit = jest.fn();

beforeEach(() => {
  render(<Search onSubmit={handleSubmit} />);
});

describe("components/Search", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a form", async () => {
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should render a input with search type", async () => {
    expect(screen.getByRole("searchbox")).toHaveProperty("type", "search");
  });

  it("should call props.onSubmit() when form is submitted", () => {
    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("should call props.onSubmit() with the user input", async () => {
    const form = screen.getByRole("form");
    const input = screen.getByRole("searchbox");
    const text = "text to search";

    await userEvent.type(input, text);
    fireEvent.submit(form);

    expect(handleSubmit).toHaveBeenCalledWith({ text });
  });
});
