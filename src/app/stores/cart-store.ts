import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Product } from "../models/product";

export type Add = (product: Product) => void;
export type Remove = (product: Product) => void;

export interface useCartStoreProps {
  state: {
    products: Product[];
  };
  actions: {
    add: Add;
    remove: Remove;
    reset: () => void;
  };
}

const initialState = {
  products: [],
};

export const useCartStore = create<useCartStoreProps>()(
  immer(set => ({
    state: { ...initialState },
    actions: {
      add(product) {
        set(({ state }) => {
          const productIndex = state.products.findIndex(
            (item: Product) => item.slugId === product.slugId
          );
          const PRODUCT_NOT_ADDED = productIndex < 0;
          if (PRODUCT_NOT_ADDED) {
            state.products.push(product);
          }
        });
      },
      remove(product) {
        set(({ state }) => {
          const productIndex = state.products.findIndex(
            (item: Product) => item.slugId === product.slugId
          );
          const PRODUCT_FOUND = productIndex >= 0;
          if (PRODUCT_FOUND) {
            state.products.splice(productIndex, 1);
          }
        });
      },
      reset() {
        set(store => {
          store.state = initialState;
        });
      },
    },
  }))
);
