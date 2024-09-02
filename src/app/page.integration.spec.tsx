import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("components/Search", () => {
  it("should render Search form component", () => {
    render(<Home />);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveProperty("name", "search-form");
  });
});
