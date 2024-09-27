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
import Cart, { CartItem } from "./page";

const onClickRemove = jest.fn();
const onClickDecrease = jest.fn();

describe("pages/Cart", () => {
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

  it("should render the items list", () => {
    render(<Cart />);
    expect(screen.getByTestId("cart-items-list")).toBeInTheDocument();
  });

  it("should render the cart item component for each item inside the cart", () => {
    const [product1, product2] = server.createList("product", 2);
    const { add } = result.current.actions;
    act(() => add({ product: product1.attrs as ProductModel, quantity: 1 }));
    act(() => add({ product: product2.attrs as ProductModel, quantity: 1 }));

    render(<Cart />);

    expect(screen.getAllByTestId("cart-item")).toHaveLength(2);
  });

  it("should render the purchase summary", () => {
    render(<Cart />);
    expect(screen.getByTestId("purchase-summary")).toBeInTheDocument();
  });

  describe("CartItem", () => {
    it("should render the props.item.product.image", () => {
      const product = server.create("product").attrs as ProductModel;
      render(
        <CartItem
          item={{ product, quantity: 1 }}
          onClickRemove={onClickRemove}
          onClickDecrease={onClickDecrease}
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
        />
      );

      expect(screen.getByTestId("quantity-stepper")).toBeInTheDocument();
      expect(screen.getByTestId("item-quantity")).toHaveTextContent("2");
      expect(screen.getByTestId("decrease-quantity")).toBeInTheDocument();
      expect(screen.getByTestId("increase-quantity")).toBeInTheDocument();
    });

    it("should call props.onClickRemove() with the product data", () => {
      const product = server.create("product").attrs as ProductModel;
      render(
        <CartItem
          item={{ product, quantity: 2 }}
          onClickRemove={onClickRemove}
          onClickDecrease={onClickDecrease}
        />
      );

      const removeButton = screen.getByRole("button", { name: /excluir/i });
      fireEvent.click(removeButton);

      expect(onClickRemove).toHaveBeenCalledTimes(1);
      expect(onClickRemove).toHaveBeenCalledWith(product);
    });

    it("should call props.onClickDecrease() with the product data", () => {
      const product = server.create("product").attrs as ProductModel;
      render(
        <CartItem
          item={{ product, quantity: 1 }}
          onClickRemove={onClickRemove}
          onClickDecrease={onClickDecrease}
        />
      );

      const decreaseButton = screen.getByTestId("decrease-quantity");
      fireEvent.click(decreaseButton);

      expect(onClickDecrease).toHaveBeenCalledTimes(1);
      expect(onClickDecrease).toHaveBeenCalledWith(product);
    });
  });

  describe("PurchaseSummary", () => {
    it("should render a ProceedToCheckout button", () => {
      render(<Cart />);
      expect(
        screen.getByRole("button", { name: /continuar a compra/i })
      ).toBeInTheDocument();
    });

    it("should render the total of the products", () => {
      const productPrice = {
        originalAmount: 100,
        numberOfInstallmentsWithoutTaxes: 1,
        installmentValue: 100,
      };

      const product1 = server.create("product", {
        price: productPrice,
      } as object).attrs as ProductModel;
      const product2 = server.create("product", {
        price: productPrice,
      } as object).attrs as ProductModel;

      const { add } = result.current.actions;
      act(() => add({ product: product1, quantity: 1 }));
      act(() => add({ product: product2, quantity: 2 }));
      render(<Cart />);

      const textToMatch = String("Produtos\\(2\\) R\\$ 300,00");

      expect(screen.getByTestId("products-total")).toBeInTheDocument();
      expect(screen.getByTestId("products-total")).toHaveTextContent(
        new RegExp(textToMatch, "i")
      );
    });

    it("should render the price of the shipping", () => {
      const product1 = server.create("product").attrs as ProductModel;
      const { add } = result.current.actions;
      act(() => add({ product: product1, quantity: 1 }));
      render(<Cart />);

      const textToMatch = String("Frete R\\$ 0,00");

      expect(screen.getByTestId("shipping")).toBeInTheDocument();
      expect(screen.getByTestId("shipping")).toHaveTextContent(
        new RegExp(textToMatch, "i")
      );
    });

    it("should render the total of the purchase", () => {
      const productPrice = {
        originalAmount: 100,
        numberOfInstallmentsWithoutTaxes: 1,
        installmentValue: 100,
      };

      const product1 = server.create("product", {
        price: productPrice,
      } as object).attrs as ProductModel;
      const product2 = server.create("product", {
        price: productPrice,
      } as object).attrs as ProductModel;

      const { add } = result.current.actions;
      act(() => add({ product: product1, quantity: 1 }));
      act(() => add({ product: product2, quantity: 2 }));
      render(<Cart />);

      const textToMatch = String("Total R\\$ 300,00");

      expect(screen.getByTestId("total")).toBeInTheDocument();
      expect(screen.getByTestId("total")).toHaveTextContent(
        new RegExp(textToMatch, "i")
      );
    });
  });
});
