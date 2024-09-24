import { render, screen } from "@testing-library/react";
import Cart from "./page";

describe("pages/Cart", () => {
  it("should render the items list", () => {
    render(<Cart />);
    expect(screen.getByTestId("cart-items-list")).toBeInTheDocument();
  });

  it("should render the purchase summary", () => {
    render(<Cart />);
    expect(screen.getByTestId("purchase-summary")).toBeInTheDocument();
  });
});
