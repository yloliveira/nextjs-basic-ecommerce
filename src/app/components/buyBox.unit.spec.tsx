import { fireEvent, render, screen } from "@testing-library/react";
import BuyBox from "./buyBox";

const onClickBuyNow = jest.fn();
const onClickAddToCart = jest.fn();

describe("components/BuyBox", () => {
  it("should render a 'Buy now' button", async () => {
    render(
      <BuyBox
        onClickBuyNow={onClickBuyNow}
        onClickAddToCart={onClickAddToCart}
      />
    );
    expect(screen.getByTestId("buy-now")).toBeInTheDocument();
  });

  it("should render a 'Add to cart' button", async () => {
    render(
      <BuyBox
        onClickBuyNow={onClickBuyNow}
        onClickAddToCart={onClickAddToCart}
      />
    );
    expect(screen.getByTestId("add-to-cart")).toBeInTheDocument();
  });

  it("should render a quantity select box with 5 options", async () => {
    render(
      <BuyBox
        onClickBuyNow={onClickBuyNow}
        onClickAddToCart={onClickAddToCart}
      />
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveLength(5);
  });

  it("should call props.onClickBuyNow()", () => {
    render(
      <BuyBox
        onClickBuyNow={onClickBuyNow}
        onClickAddToCart={onClickAddToCart}
      />
    );
    const [buyNowButton] = screen.getAllByRole("button");
    fireEvent.click(buyNowButton);
    expect(onClickBuyNow).toHaveBeenCalledTimes(1);
  });

  it("should call props.onClickAddToCart()", () => {
    render(
      <BuyBox
        onClickBuyNow={onClickBuyNow}
        onClickAddToCart={onClickAddToCart}
      />
    );
    const [_, addToCartButton] = screen.getAllByRole("button");
    fireEvent.click(addToCartButton);
    expect(onClickAddToCart).toHaveBeenCalledTimes(1);
  });
});
