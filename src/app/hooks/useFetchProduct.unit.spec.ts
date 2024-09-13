import { renderHook, waitFor } from "@testing-library/react";
import { Server, Response } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import { useFetchProduct } from "./useFetchProduct";

describe("hooks/useFetchProduct", () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should return a product with a certain slugId", async () => {
    const slugId = "product_slugId";
    server.createList("product", 10);
    server.create("product", {
      slugId,
    } as object);

    const { result } = renderHook(() => useFetchProduct(slugId));

    await waitFor(() => {
      expect(result.current.product?.slugId).toBe(slugId);
    });
  });

  it("should set error to true when catch block is executed", async () => {
    const slugId = "product_slugId";
    server.get(`product/${slugId}`, () => {
      return new Response(500, {}, "");
    });
    const { result } = renderHook(() => useFetchProduct(slugId));

    await waitFor(() => {
      expect(result.current.error).toBe(true);
      expect(result.current.product).toBeUndefined();
    });
  });

  it("should set error to true when the product is not found", async () => {
    const slugId = "product_slugId";
    const { result } = renderHook(() => useFetchProduct(slugId));

    await waitFor(() => {
      expect(result.current.error).toBe(true);
      expect(result.current.product).toBeUndefined();
    });
  });
});
