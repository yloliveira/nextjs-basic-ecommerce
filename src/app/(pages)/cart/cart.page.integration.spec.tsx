import {
  render,
  screen,
  renderHook,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
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

  it("should remove the product from the cart when RemoveButton is clicked", async () => {
    const product = server.create("product").attrs as ProductModel;
    const { add } = result.current.actions;
    act(() => add({ product, quantity: 1 }));
    render(<Cart />);

    await waitFor(async () => {
      expect(result.current.state.items).toHaveLength(1);

      fireEvent.click(screen.getByRole("button", { name: /excluir/i }));

      expect(result.current.state.items).toHaveLength(0);
    });
  });
});
