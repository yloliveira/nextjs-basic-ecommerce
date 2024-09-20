import { render, screen } from "@testing-library/react";
import Cart from "./cart";

describe("components/Cart", () => {
  beforeEach(() => {
    render(<Cart />);
  });

  it("should render a 'checkout' button", async () => {
    expect(screen.getByTestId("checkout")).toBeInTheDocument();
  });
});
