import { renderHook, waitFor } from "@testing-library/react";
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

  it("should set error to true when catch block is executed", async () => {
    server.get("/api/products", () => {
      return new Response(500, {}, "");
    });
    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => {
      expect(result.current.error).toBe(true);
      expect(result.current.products).toHaveLength(0);
    });
  });
});
