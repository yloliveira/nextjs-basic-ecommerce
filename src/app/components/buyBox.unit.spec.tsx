import { render, screen } from "@testing-library/react";
import BuyBox from "./buyBox";

describe("components/BuyBox", () => {
  it("should render a 'Buy now' button", async () => {
    render(<BuyBox />);
    expect(screen.getByTestId("buy-now")).toBeInTheDocument();
  });

  it("should render a 'Add to cart' button", async () => {
    render(<BuyBox />);
    expect(screen.getByTestId("add-to-cart")).toBeInTheDocument();
  });

  it("should render a quantity select box with 5 options", async () => {
    render(<BuyBox />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveLength(5);
  });
});
