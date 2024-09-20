import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import { nextNavigationPushMock } from "@/../__mocks__/next";
import { Product as ProductModel } from "@/app/models/product";
import Product from "./page";

describe("pages/Product", () => {
  let server: Server;
  let product: ProductModel;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
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
});
