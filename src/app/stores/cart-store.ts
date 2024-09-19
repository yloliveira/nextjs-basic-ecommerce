import { create } from "zustand";
import { Product } from "../models/product";

interface Props {
  state: {
    products: Product[];
  };
  actions: {
    add: (product: Product) => void;
  };
}

export const useCartStore = create<Props>(set => ({
  state: {
    products: [],
  },
  actions: {
    add: product =>
      set(store => ({
        state: {
          products: [...store.state.products, product],
        },
      })),
  },
}));
