import { render, screen, fireEvent } from "@testing-library/react";
import CartModal from "./cart-modal";

const onClickSeeMoreProducts = jest.fn();
const onClickCheckout = jest.fn();
const onClickClose = jest.fn();

const makeSut = (isOpen = true) => {
  render(
    <CartModal
      isOpen={isOpen}
      onClickSeeMoreProducts={onClickSeeMoreProducts}
      onClickCheckout={onClickCheckout}
      onClickClose={onClickClose}
    />
  );
};

describe("components/CartModal", () => {
  it("should render a close button", async () => {
    makeSut();
    expect(screen.getByTestId("close")).toBeInTheDocument();
  });

  it("should render a 'see more products' button", async () => {
    makeSut();
    expect(screen.getByTestId("see-more-products")).toBeInTheDocument();
  });

  it("should render a 'checkout' button", async () => {
    makeSut();
    expect(screen.getByTestId("checkout")).toBeInTheDocument();
  });

  it("should have a absolute css class", () => {
    makeSut();
    expect(screen.getByTestId("cart-modal")).toHaveClass("absolute");
  });

  it("should not have a hidden css class if props.isOpen is true", () => {
    makeSut();
    expect(screen.getByTestId("cart-modal")).not.toHaveClass("hidden");
  });

  it("should have a hidden css class if props.isOpen is false", () => {
    makeSut(false);
    expect(screen.getByTestId("cart-modal")).toHaveClass("hidden");
  });

  it("should call props.onClickSeeMoreProducts()", () => {
    makeSut();
    const [seeMoreProductsButton] = screen.getAllByRole("button");
    fireEvent.click(seeMoreProductsButton);
    expect(onClickSeeMoreProducts).toHaveBeenCalledTimes(1);
  });

  it("should call props.onClickCheckout()", () => {
    makeSut();
    const [_, checkoutButton] = screen.getAllByRole("button");
    fireEvent.click(checkoutButton);
    expect(onClickCheckout).toHaveBeenCalledTimes(1);
  });

  it("should call props.onClickClose()", () => {
    makeSut();
    const closeButton = screen.getByTestId("close");
    fireEvent.click(closeButton);
    expect(onClickClose).toHaveBeenCalledTimes(1);
  });
});
