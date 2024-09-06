import React from "react";
import axios from "axios";
import { Product } from "@/app/models/product";

export const useFetchProducts = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("/api/products")
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(e => {
        setError(true);
      });
  }, []);

  return { products, error };
};
