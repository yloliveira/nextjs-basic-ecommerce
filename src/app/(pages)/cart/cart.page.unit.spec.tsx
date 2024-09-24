import { render, screen, renderHook, act } from "@testing-library/react";
import { Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import { Product as ProductModel } from "@/app/models/product";
import { useCartStore, useCartStoreProps } from "@/app/stores/cart-store";
import Cart from "./page";

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
});
