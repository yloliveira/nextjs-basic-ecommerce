import { createServer, Model, Response, Registry, Server } from "miragejs";
import Schema from "miragejs/orm/schema";
import { productFactory } from "./factories/product";
import { ProductModel } from "./models";

type AppRegistry = Registry<
  {
    products: typeof ProductModel;
  },
  {}
>;
type AppSchema = Schema<AppRegistry>;

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

      this.get("products", (schema: AppSchema, request) => {
        const search = String(request.queryParams.search || "");

        if (search) {
          return schema.where("products", product =>
            product.title.match(new RegExp(search, "i"))
          );
        }

        return schema.all("products");
      });
    },
  });
}
