import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./search";

const submit = jest.fn();

describe("components/Search", () => {
  it("should render a form", async () => {
    render(<Search submit={submit} />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should call props.submit() when form is submitted", async () => {
    render(<Search submit={submit} />);
    const form = screen.getByRole("form");

    fireEvent.submit(form);

    expect(submit).toHaveBeenCalledTimes(1);
  });
});
