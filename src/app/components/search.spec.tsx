import { render, screen } from "@testing-library/react";
import Search from "./search";

describe("components/Search", () => {
  it("should render a form", async () => {
    render(<Search />);
    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});
