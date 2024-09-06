import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("pages/Home", () => {
  it("should render Search form component", () => {
    render(<Home />);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveProperty("name", "search-form");
  });

  it("should render the ProductList", () => {
    render(<Home />);
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });
});
