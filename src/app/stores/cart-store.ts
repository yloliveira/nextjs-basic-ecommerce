import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";
import { Product } from "../models/product";

export type Toggle = () => void;
export type Add = ({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) => void;
export type Remove = (product: Product) => void;
export type RemoveAll = () => void;

type CartItem = {
  product: Product;
  quantity: number;
};

export interface useCartStoreProps {
  state: {
    open: boolean;
    items: CartItem[];
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
  items: [],
};

export const useCartStore = create<useCartStoreProps>()(
  persist(
    immer(set => ({
      state: { ...initialState },
      actions: {
        toggle() {
          set(({ state }) => {
            state.open = !state.open;
          });
        },
        add({ product, quantity }) {
          set(({ state }) => {
            const productIndex = state.items.findIndex(
              (item: CartItem) => item.product.slugId === product.slugId
            );
            const PRODUCT_NOT_ADDED = productIndex < 0;
            if (PRODUCT_NOT_ADDED) {
              state.items.push({ product, quantity });
            } else {
              state.items[productIndex].quantity += quantity;
            }
          });
        },
        remove(product) {
          set(({ state }) => {
            const productIndex = state.items.findIndex(
              (item: CartItem) => item.product.slugId === product.slugId
            );
            const PRODUCT_FOUND = productIndex >= 0;
            if (PRODUCT_FOUND) {
              if (state.items[productIndex].quantity > 1) {
                state.items[productIndex].quantity -= 1;
              } else {
                state.items.splice(productIndex, 1);
              }
            }
          });
        },
        removeAll() {
          set(({ state }) => {
            state.items = [];
          });
        },
        reset() {
          set(store => {
            store.state = initialState;
          });
        },
      },
    })),
    {
      name: "cart-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: ({ state }) => ({ state }),
    }
  )
);
