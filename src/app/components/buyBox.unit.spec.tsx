import { fireEvent, render, screen } from "@testing-library/react";
import BuyBox from "./buyBox";
import userEvent from "@testing-library/user-event";

const onClickBuyNow = jest.fn();
const onClickAddToCart = jest.fn();
const onChangeQuantity = jest.fn();

describe("components/BuyBox", () => {
  beforeEach(() => {
    render(
      <BuyBox
        onClickBuyNow={onClickBuyNow}
        onClickAddToCart={onClickAddToCart}
        onChangeQuantity={onChangeQuantity}
      />
    );
  });

  it("should render a 'Buy now' button", async () => {
    expect(screen.getByTestId("buy-now")).toBeInTheDocument();
  });

  it("should render a 'Add to cart' button", async () => {
    expect(screen.getByTestId("add-to-cart")).toBeInTheDocument();
  });

  it("should render a quantity select box with 5 options", async () => {
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveLength(5);
  });

  it("should call props.onClickBuyNow()", () => {
    const [buyNowButton] = screen.getAllByRole("button");
    fireEvent.click(buyNowButton);
    expect(onClickBuyNow).toHaveBeenCalledTimes(1);
  });

  it("should call props.onClickAddToCart()", () => {
    const [_, addToCartButton] = screen.getAllByRole("button");
    fireEvent.click(addToCartButton);
    expect(onClickAddToCart).toHaveBeenCalledTimes(1);
  });

  it("should call props.onChangeQuantity() with the chosen quantity", async () => {
    const quantitySelect = screen.getByRole("combobox");
    await userEvent.selectOptions(quantitySelect, "2");

    expect(onChangeQuantity).toHaveBeenCalledTimes(1);
    expect(onChangeQuantity).toHaveBeenCalledWith(2);
  });
});
