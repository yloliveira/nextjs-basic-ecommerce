import { renderHook, act } from "@testing-library/react";
import { Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import { Product } from "@/app/models/product";
import { useCartStore } from "./cart-store";

describe("stores/cart-store", () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer();
  });

  afterEach(() => {
    server.shutdown();
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
});
