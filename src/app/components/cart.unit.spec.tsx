import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./cart";

const onClickSeeMoreProducts = jest.fn();
const onClickCheckout = jest.fn();
const onClickClose = jest.fn();

describe("components/Cart", () => {
  beforeEach(() => {
    render(
      <Cart
        onClickSeeMoreProducts={onClickSeeMoreProducts}
        onClickCheckout={onClickCheckout}
        onClickClose={onClickClose}
      />
    );
  });

  it("should render a close button", async () => {
    expect(screen.getByTestId("close")).toBeInTheDocument();
  });

  it("should render a 'see more products' button", async () => {
    expect(screen.getByTestId("see-more-products")).toBeInTheDocument();
  });

  it("should render a 'checkout' button", async () => {
    expect(screen.getByTestId("checkout")).toBeInTheDocument();
  });

  it("should call props.onClickSeeMoreProducts()", () => {
    const [seeMoreProductsButton] = screen.getAllByRole("button");
    fireEvent.click(seeMoreProductsButton);
    expect(onClickSeeMoreProducts).toHaveBeenCalledTimes(1);
  });

  it("should call props.onClickCheckout()", () => {
    const [_, checkoutButton] = screen.getAllByRole("button");
    fireEvent.click(checkoutButton);
    expect(onClickCheckout).toHaveBeenCalledTimes(1);
  });

  it("should call props.onClickClose()", () => {
    const closeButton = screen.getByTestId("close");
    fireEvent.click(closeButton);
    expect(onClickClose).toHaveBeenCalledTimes(1);
  });
});
