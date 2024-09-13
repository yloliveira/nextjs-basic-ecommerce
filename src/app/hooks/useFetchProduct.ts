import React from "react";
import axios from "axios";
import { Product } from "@/app/models/product";

export const useFetchProduct = (slugId: string) => {
  const [product, setProduct] = React.useState<Product>();
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`/api/product/${slugId}`)
      .then(res => {
        setProduct(res.data.product);
      })
      .catch(e => {
        setError(true);
      });
  }, [slugId]);

  return { product, error };
};
