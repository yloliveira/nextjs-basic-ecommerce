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
import { nextNavigationPushMock } from "@/../__mocks__/next";
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

  it("should decrease the item quantity by 1 when decreaseButton is clicked", async () => {
    const product = server.create("product").attrs as ProductModel;
    const { add } = result.current.actions;
    act(() => add({ product, quantity: 2 }));
    render(<Cart />);

    await waitFor(async () => {
      expect(result.current.state.items[0].quantity).toBe(2);

      fireEvent.click(screen.getByTestId("decrease-quantity"));

      expect(result.current.state.items[0].quantity).toBe(1);
    });
  });

  it("should increase the item quantity by 1 when increaseButton is clicked", async () => {
    const product = server.create("product").attrs as ProductModel;
    const { add } = result.current.actions;
    act(() => add({ product, quantity: 1 }));
    render(<Cart />);

    await waitFor(async () => {
      expect(result.current.state.items[0].quantity).toBe(1);

      fireEvent.click(screen.getByTestId("increase-quantity"));

      expect(result.current.state.items[0].quantity).toBe(2);
    });
  });

  it("should call router.push('/checkout'), when CheckoutButton is clicked, if there's session_id into the sessionStorage", async () => {
    const product = server.create("product").attrs as ProductModel;
    const { add } = result.current.actions;
    act(() => add({ product, quantity: 1 }));
    render(<Cart />);

    sessionStorage.setItem("session_id", "valid_session_id");

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: /continuar a compra/i })
      );
      expect(nextNavigationPushMock).toHaveBeenCalledWith("/checkout");
    });
  });

  it("should not call router.push('/checkout'), when CheckoutButton is clicked, if there's no session_id into the sessionStorage", async () => {
    const product = server.create("product").attrs as ProductModel;
    const { add } = result.current.actions;
    act(() => add({ product, quantity: 1 }));
    render(<Cart />);

    sessionStorage.setItem("session_id", "");

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: /continuar a compra/i })
      );
      expect(nextNavigationPushMock).not.toHaveBeenCalledWith("/checkout");
    });
  });

  it("should call router.push('/login'), when CheckoutButton is clicked, if there's no session_id into the sessionStorage", async () => {
    const product = server.create("product").attrs as ProductModel;
    const { add } = result.current.actions;
    act(() => add({ product, quantity: 1 }));
    render(<Cart />);

    sessionStorage.setItem("session_id", "");

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: /continuar a compra/i })
      );
      expect(nextNavigationPushMock).toHaveBeenCalledWith("/login");
    });
  });

  it("should not call router.push('/login'), when CheckoutButton is clicked, if there's session_id into the sessionStorage", async () => {
    const product = server.create("product").attrs as ProductModel;
    const { add } = result.current.actions;
    act(() => add({ product, quantity: 1 }));
    render(<Cart />);

    sessionStorage.setItem("session_id", "valid_session_id");

    await waitFor(() => {
      fireEvent.click(
        screen.getByRole("button", { name: /continuar a compra/i })
      );
      expect(nextNavigationPushMock).not.toHaveBeenCalledWith("/login");
    });
  });
});
