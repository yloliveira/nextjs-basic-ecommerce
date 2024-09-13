import { createServer, Model, Response, Registry } from "miragejs";
import Schema from "miragejs/orm/schema";
import { productFactory } from "./factories/product";
import { ProductModel } from "./models";
import products from "./fixtures/products";

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
    fixtures: {
      products,
    },
    factories: {
      product: productFactory,
    },
    seeds(server) {
      server.loadFixtures();
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

      this.get("product/:slugId", (schema: AppSchema, request) => {
        const slugId = String(request.params.slugId);
        const product = schema.findBy("products", { slugId });

        if (!product) {
          return new Response(404, {}, "Product not found");
        }

        return { product };
      });
    },
  });
}
