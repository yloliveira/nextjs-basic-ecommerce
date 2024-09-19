import { renderHook, act } from "@testing-library/react";
import { Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import { Product } from "@/app/models/product";
import { useCartStore, useCartStoreProps } from "./cart-store";

describe("stores/cart-store", () => {
  let server: Server;
  let store: useCartStoreProps;

  beforeAll(() => {
    const { result } = renderHook(() => useCartStore());
    store = result.current;
  });

  beforeEach(() => {
    server = makeServer();
  });

  afterEach(() => {
    server.shutdown();
    act(() => {
      store.actions.reset();
    });
  });

  it("should return an empty array for products on initial state", () => {
    const { result } = renderHook(() => useCartStore());

    expect(Array.isArray(result.current.state.products)).toBe(true);
    expect(result.current.state.products).toHaveLength(0);
  });

  it("should add 2 products to the list", async () => {
    const { result } = renderHook(() => useCartStore());
    const products = server.createList("product", 2);

    expect(result.current.state.products).toHaveLength(0);

    for (const product of products) {
      act(() => {
        result.current.actions.add(product.attrs as Product);
      });
    }

    expect(result.current.state.products).toHaveLength(2);
  });

  it("should not add the same product twice", async () => {
    const { result } = renderHook(() => useCartStore());
    const product = server.create("product");
    const { add } = result.current.actions;

    expect(result.current.state.products).toHaveLength(0);

    act(() => add(product.attrs as Product));
    act(() => add(product.attrs as Product));

    expect(result.current.state.products).toHaveLength(1);
  });
});
