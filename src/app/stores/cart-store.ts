import { create } from "zustand";
import { Product } from "../models/product";

export interface useCartStoreProps {
  state: {
    products: Product[];
  };
  actions: {
    add: (product: Product) => void;
    reset: () => void;
  };
}

const initialState = {
  products: [],
};

const addProduct = (store: useCartStoreProps, product: Product) => {
  if (store.state.products.includes(product)) {
    return store.state.products;
  }

  return [...store.state.products, product];
};

export const useCartStore = create<useCartStoreProps>(set => ({
  state: { ...initialState },
  actions: {
    add: product =>
      set(store => ({
        state: {
          products: addProduct(store, product),
        },
      })),
    reset: () =>
      set(() => ({
        state: { ...initialState },
      })),
  },
}));
