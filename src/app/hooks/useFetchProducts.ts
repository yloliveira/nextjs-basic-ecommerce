import React from "react";
import axios from "axios";
import { Product } from "@/app/models/product";

export const useFetchProducts = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [error, setError] = React.useState(false);
  const [filter, setFilter] = React.useState("");

  const params = filter ? `?search=${filter}` : "";

  React.useEffect(() => {
    axios
      .get(`/api/products${params}`)
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(e => {
        setError(true);
      });
  }, [params]);

  return { products, error, setFilter };
};
