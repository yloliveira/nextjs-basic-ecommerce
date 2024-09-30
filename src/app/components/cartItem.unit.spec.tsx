import {
  render,
  screen,
  renderHook,
  act,
  fireEvent,
} from "@testing-library/react";
import { Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import { Product as ProductModel } from "@/app/models/product";
import { useCartStore, useCartStoreProps } from "@/app/stores/cart-store";
import CartItem from "./cartItem";

const onClickRemove = jest.fn();
const onClickDecrease = jest.fn();
const onClickIncrease = jest.fn();

describe("components/CartItem", () => {
  let server: Server;
  let result: { current: useCartStoreProps };

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    result = renderHook(() => useCartStore()).result;
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
    act(() => result.current.actions.reset());
  });

  it("should render the props.item.product.image", () => {
    const product = server.create("product").attrs as ProductModel;
    render(
      <CartItem
        item={{ product, quantity: 1 }}
        onClickRemove={onClickRemove}
        onClickDecrease={onClickDecrease}
        onClickIncrease={onClickIncrease}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveProperty("src", product.image);
    expect(screen.getByRole("img")).toHaveProperty("alt", product.title);
  });

  it("should render the props.item.product.title", () => {
    const product = server.create("product").attrs as ProductModel;
    render(
      <CartItem
        item={{ product, quantity: 1 }}
        onClickRemove={onClickRemove}
        onClickDecrease={onClickDecrease}
        onClickIncrease={onClickIncrease}
      />
    );

    expect(
      screen.getByText(new RegExp(product.title, "i"))
    ).toBeInTheDocument();
  });

  it("should render the total price of the item", () => {
    const productPrice = {
      originalAmount: 100,
      numberOfInstallmentsWithoutTaxes: 1,
      installmentValue: 100,
    };
    const product = server.create("product", {
      price: productPrice,
    } as object).attrs as ProductModel;
    render(
      <CartItem
        item={{ product, quantity: 2 }}
        onClickRemove={onClickRemove}
        onClickDecrease={onClickDecrease}
        onClickIncrease={onClickIncrease}
      />
    );

    const textToMatch = String("R\\$ 200,00");

    expect(screen.getByTestId("item-total")).toBeInTheDocument();
    expect(screen.getByTestId("item-total")).toHaveTextContent(
      new RegExp(textToMatch, "i")
    );
  });

  it("should render a remove item button", () => {
    const product = server.create("product").attrs as ProductModel;
    render(
      <CartItem
        item={{ product, quantity: 1 }}
        onClickRemove={onClickRemove}
        onClickDecrease={onClickDecrease}
        onClickIncrease={onClickIncrease}
      />
    );

    expect(
      screen.getByRole("button", { name: /excluir/i })
    ).toBeInTheDocument();
  });

  it("should render a quantity stepper", () => {
    const product = server.create("product").attrs as ProductModel;
    render(
      <CartItem
        item={{ product, quantity: 2 }}
        onClickRemove={onClickRemove}
        onClickDecrease={onClickDecrease}
        onClickIncrease={onClickIncrease}
      />
    );

    expect(screen.getByTestId("quantity-stepper")).toBeInTheDocument();
    expect(screen.getByTestId("item-quantity")).toHaveTextContent("2");
    expect(screen.getByTestId("decrease-quantity")).toBeInTheDocument();
    expect(screen.getByTestId("increase-quantity")).toBeInTheDocument();
  });

  it("should call props.onClickRemove() with the item data", () => {
    const product = server.create("product").attrs as ProductModel;
    render(
      <CartItem
        item={{ product, quantity: 2 }}
        onClickRemove={onClickRemove}
        onClickDecrease={onClickDecrease}
        onClickIncrease={onClickIncrease}
      />
    );

    const removeButton = screen.getByRole("button", { name: /excluir/i });
    fireEvent.click(removeButton);

    expect(onClickRemove).toHaveBeenCalledTimes(1);
    expect(onClickRemove).toHaveBeenCalledWith({ product, quantity: 2 });
  });

  it("should call props.onClickDecrease() with the product data", () => {
    const product = server.create("product").attrs as ProductModel;
    render(
      <CartItem
        item={{ product, quantity: 1 }}
        onClickRemove={onClickRemove}
        onClickDecrease={onClickDecrease}
        onClickIncrease={onClickIncrease}
      />
    );

    const decreaseButton = screen.getByTestId("decrease-quantity");
    fireEvent.click(decreaseButton);

    expect(onClickDecrease).toHaveBeenCalledTimes(1);
    expect(onClickDecrease).toHaveBeenCalledWith(product);
  });

  it("should call props.onClickIncrease() with the product data", () => {
    const product = server.create("product").attrs as ProductModel;
    render(
      <CartItem
        item={{ product, quantity: 1 }}
        onClickRemove={onClickRemove}
        onClickDecrease={onClickDecrease}
        onClickIncrease={onClickIncrease}
      />
    );

    const increaseButton = screen.getByTestId("increase-quantity");
    fireEvent.click(increaseButton);

    expect(onClickIncrease).toHaveBeenCalledTimes(1);
    expect(onClickIncrease).toHaveBeenCalledWith(product);
  });
});
