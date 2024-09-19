import { create } from "zustand";
import { Product } from "../models/product";

interface Props {
  state: {
    products: Product[];
  };
}

export const useCartStore = create<Props>(set => ({
  state: {
    products: [],
  },
}));
