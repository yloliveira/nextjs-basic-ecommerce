import { render, screen } from "@testing-library/react";
import Cart from "./page";

describe("pages/Cart", () => {
  it("should render the items list", () => {
    render(<Cart />);
    expect(screen.getByTestId("cart-items-list")).toBeInTheDocument();
  });
});
