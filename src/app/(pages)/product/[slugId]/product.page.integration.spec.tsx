import {
  fireEvent,
  render,
  screen,
  waitFor,
  renderHook,
  act,
} from "@testing-library/react";
import { Server } from "miragejs";
import { setAutoFreeze } from "immer";
import { makeServer } from "@/mock-api/miragejs/server";
import { nextNavigationPushMock } from "@/../__mocks__/next";
import { Product as ProductModel } from "@/app/models/product";
import Product from "./page";
import { useCartStore, useCartStoreProps } from "@/app/stores/cart-store";

setAutoFreeze(false);

describe("pages/Product", () => {
  let server: Server;
  let product: ProductModel;
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

  it("should call router.push('/login'), when BuyNowButton is clicked, if there's no session_id into the sessionStorage", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    sessionStorage.setItem("session_id", "");

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("buy-now"));
      expect(nextNavigationPushMock).toHaveBeenCalledTimes(1);
      expect(nextNavigationPushMock).toHaveBeenCalledWith("/login");
    });
  });

  it("should not call router.push('/login'), when BuyNowButton is clicked, if there's session_id into the sessionStorage", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    sessionStorage.setItem("session_id", "valid_session_id");

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("buy-now"));
      expect(nextNavigationPushMock).not.toHaveBeenCalledWith("/login");
    });
  });

  it("should call router.push('/checkout'), when BuyNowButton is clicked, if there's session_id into the sessionStorage", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    sessionStorage.setItem("session_id", "valid_session_id");

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("buy-now"));
      expect(nextNavigationPushMock).toHaveBeenCalledTimes(1);
      expect(nextNavigationPushMock).toHaveBeenCalledWith("/checkout");
    });
  });

  it("should not call router.push('/checkout'), when BuyNowButton is clicked, if there's no session_id into the sessionStorage", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    sessionStorage.setItem("session_id", "");

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("buy-now"));
      expect(nextNavigationPushMock).not.toHaveBeenCalledWith("/checkout");
    });
  });

  it("should call cart-store.add() with the product data when AddToCartButton is clicked", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      const spy = jest.spyOn(result.current.actions, "add");
      fireEvent.click(screen.getByTestId("add-to-cart"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith({ product, quantity: 1 });
    });
  });

  it("should add the product into the cart when AddToCartButton is clicked", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      expect(result.current.state.items).toHaveLength(0);
      fireEvent.click(screen.getByTestId("add-to-cart"));
      expect(result.current.state.items).toHaveLength(1);
      expect(result.current.state.items[0].product).toEqual(product);
    });
  });

  it("should call cart-store.toggle() when AddToCartButton is clicked", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      const spy = jest.spyOn(result.current.actions, "toggle");
      fireEvent.click(screen.getByTestId("add-to-cart"));
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("should toggle the cartModal open state when AddToCartButton is clicked", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      expect(result.current.state.open).toBe(false);
      fireEvent.click(screen.getByTestId("add-to-cart"));
      expect(result.current.state.open).toBe(true);
    });
  });

  it("should call cart-store.toggle() when CloseButton is clicked", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      const spy = jest.spyOn(result.current.actions, "toggle");
      fireEvent.click(screen.getByTestId("close"));
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("should toggle the cartModal open state when CloseButton is clicked", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      expect(result.current.state.open).toBe(false);
      fireEvent.click(screen.getByTestId("add-to-cart"));
      expect(result.current.state.open).toBe(true);
      fireEvent.click(screen.getByTestId("close"));
      expect(result.current.state.open).toBe(false);
    });
  });

  it("should call router.push('/checkout'), when CheckoutButton is clicked, if there's session_id into the sessionStorage", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    sessionStorage.setItem("session_id", "valid_session_id");

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("checkout"));
      expect(nextNavigationPushMock).toHaveBeenCalledWith("/checkout");
    });
  });

  it("should not call router.push('/checkout'), when CheckoutButton is clicked, if there's no session_id into the sessionStorage", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    sessionStorage.setItem("session_id", "");

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("checkout"));
      expect(nextNavigationPushMock).not.toHaveBeenCalledWith("/checkout");
    });
  });

  it("should call router.push('/login'), when CheckoutButton is clicked, if there's no session_id into the sessionStorage", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    sessionStorage.setItem("session_id", "");

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("checkout"));
      expect(nextNavigationPushMock).toHaveBeenCalledWith("/login");
    });
  });

  it("should not call router.push('/login'), when CheckoutButton is clicked, if there's session_id into the sessionStorage", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    sessionStorage.setItem("session_id", "valid_session_id");

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("checkout"));
      expect(nextNavigationPushMock).not.toHaveBeenCalledWith("/login");
    });
  });

  it("should call router.push('/') when SeeMoreProductsButton is clicked", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("see-more-products"));
      expect(nextNavigationPushMock).toHaveBeenCalledWith("/");
    });
  });
});
