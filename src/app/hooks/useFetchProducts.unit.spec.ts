import { act, renderHook, waitFor } from "@testing-library/react";
import { Server, Response } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import { useFetchProducts } from "./useFetchProducts";

describe("hooks/useFetchProducts", () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should return a list of 10 products", async () => {
    server.createList("product", 10);
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(10);
    });
  });

  it("should be able to filter the result setting a filter", async () => {
    const searchTerm = "Product Title";
    server.createList("product", 10);
    server.create("product", {
      title: searchTerm,
    } as object);

    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(11);
    });

    act(() => {
      result.current.setFilter(searchTerm);
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(1);
      expect(result.current.products[0].title).toMatch(
        new RegExp(searchTerm, "i")
      );
    });
  });

  it("should set error to true when catch block is executed", async () => {
    server.get("products", () => {
      return new Response(500, {}, "");
    });
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.error).toBe(true);
      expect(result.current.products).toHaveLength(0);
    });
  });
});
