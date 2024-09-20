import { create } from "zustand";
import { Product } from "../models/product";

export type Add = (product: Product) => void;

export interface useCartStoreProps {
  state: {
    products: Product[];
  };
  actions: {
    add: Add;
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
