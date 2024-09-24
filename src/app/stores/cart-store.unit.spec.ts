import { renderHook, act } from "@testing-library/react";
import { Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import { Product } from "@/app/models/product";
import {
  useCartStore,
  useCartStoreProps,
  Toggle,
  Add,
  Remove,
  RemoveAll,
} from "./cart-store";

describe("stores/cart-store", () => {
  let server: Server;
  let result: { current: useCartStoreProps };
  let toggle: Toggle;
  let add: Add;
  let remove: Remove;
  let removeAll: RemoveAll;

  beforeEach(() => {
    result = renderHook(() => useCartStore()).result;
    toggle = result.current.actions.toggle;
    add = result.current.actions.add;
    remove = result.current.actions.remove;
    removeAll = result.current.actions.removeAll;
    server = makeServer();
  });

  afterEach(() => {
    server.shutdown();
    act(() => {
      result.current.actions.reset();
    });
  });

  it("should return an empty array for items on initial state", () => {
    expect(Array.isArray(result.current.state.items)).toBe(true);
    expect(result.current.state.items).toHaveLength(0);
  });

  it("should add 2 items to the list", async () => {
    const products = server.createList("product", 2);

    expect(result.current.state.items).toHaveLength(0);

    for (const product of products) {
      act(() => add(product.attrs as Product));
    }

    expect(result.current.state.items).toHaveLength(2);
  });

  it("should not add the same product twice", async () => {
    const product = server.create("product");

    expect(result.current.state.items).toHaveLength(0);

    act(() => add(product.attrs as Product));
    act(() => add(product.attrs as Product));

    expect(result.current.state.items).toHaveLength(1);
  });

  it("should remove a product from the list", async () => {
    const [product1, product2] = server.createList("product", 2);

    act(() => add(product1.attrs as Product));
    act(() => add(product2.attrs as Product));

    expect(result.current.state.items).toHaveLength(2);

    act(() => remove(product2.attrs as Product));

    expect(result.current.state.items).toHaveLength(1);
  });

  it("should remove all items from the list", async () => {
    const [product1, product2] = server.createList("product", 2);

    act(() => add(product1.attrs as Product));
    act(() => add(product2.attrs as Product));

    expect(result.current.state.items).toHaveLength(2);

    act(() => removeAll());

    expect(result.current.state.items).toHaveLength(0);
  });

  it("should toggle open state", async () => {
    expect(result.current.state.open).toBe(false);

    act(() => toggle());

    expect(result.current.state.open).toBe(true);

    act(() => toggle());

    expect(result.current.state.open).toBe(false);
  });
});
