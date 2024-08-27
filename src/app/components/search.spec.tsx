import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./search";

const submit = jest.fn();

beforeEach(() => {
  render(<Search submit={submit} />);
});

describe("components/Search", () => {
  it("should render a form", async () => {
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should call props.submit() when form is submitted", () => {
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(submit).toHaveBeenCalledTimes(1);
  });
});
