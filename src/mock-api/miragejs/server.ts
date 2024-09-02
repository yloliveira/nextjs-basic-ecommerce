import { createServer, Model } from "miragejs";
import { productFactory } from "./factories/product";

export function makeServer({ environment = "test" } = {}) {
  return createServer({
    environment,
    models: {
      products: Model,
    },
    factories: {
      product: productFactory,
    },
    seeds(server) {
      server.createList("product", 25);
    },
    routes() {
      this.namespace = "api";

      this.get("/products", schema => {
        return schema.all("products");
      });
    },
  });
}
