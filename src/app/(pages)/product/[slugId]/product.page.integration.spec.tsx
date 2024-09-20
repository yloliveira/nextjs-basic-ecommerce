import {
  fireEvent,
  render,
  screen,
  waitFor,
  renderHook,
} from "@testing-library/react";
import { Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import { nextNavigationPushMock } from "@/../__mocks__/next";
import { Product as ProductModel } from "@/app/models/product";
import Product from "./page";
import { useCartStore, useCartStoreProps } from "@/app/stores/cart-store";

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

  it("should add the product into the cart when AddToCartButton is clicked", async () => {
    product = server.create("product").attrs as ProductModel;
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      expect(result.current.state.products).toHaveLength(0);
      fireEvent.click(screen.getByTestId("add-to-cart"));
      expect(result.current.state.products).toHaveLength(1);
      expect(result.current.state.products[0]).toEqual(product);
    });
  });
});
