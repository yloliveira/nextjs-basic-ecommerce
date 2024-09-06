import { makeServer } from "@/mock-api/miragejs/server";
import { renderHook, waitFor } from "@testing-library/react";
import { Server } from "miragejs";
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
});
