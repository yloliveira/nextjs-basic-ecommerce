import { renderHook, waitFor } from "@testing-library/react";
import { useCartStore } from "./cart-store";

describe("stores/cart-store", () => {
  it("should return an empty array for products on initial state", async () => {
    const { result } = renderHook(() => useCartStore());

    expect(Array.isArray(result.current.state.products)).toBe(true);
    expect(result.current.state.products).toHaveLength(0);
  });
});
