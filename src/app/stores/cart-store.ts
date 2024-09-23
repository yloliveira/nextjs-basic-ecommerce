import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Product } from "../models/product";

export type Toggle = () => void;
export type Add = (product: Product) => void;
export type Remove = (product: Product) => void;
export type RemoveAll = () => void;

export interface useCartStoreProps {
  state: {
    open: boolean;
    products: Product[];
  };
  actions: {
    toggle: Toggle;
    add: Add;
    remove: Remove;
    removeAll: RemoveAll;
    reset: () => void;
  };
}

const initialState = {
  open: false,
  products: [],
};

export const useCartStore = create<useCartStoreProps>()(
  immer(set => ({
    state: { ...initialState },
    actions: {
      toggle() {
        set(({ state }) => {
          state.open = !state.open;
        });
      },
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
      removeAll() {
        set(({ state }) => {
          state.products = [];
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
