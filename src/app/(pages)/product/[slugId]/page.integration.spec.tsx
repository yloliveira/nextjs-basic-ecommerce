import { render, screen, waitFor } from "@testing-library/react";
import { Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import Product from "./page";

const product = {
  slugId: "product_title",
  title: "product title",
  price: {
    originalAmount: 4990,
    numberOfInstallmentsWithoutTaxes: 10,
    installmentValue: 499,
  },
  image:
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0286e0143870775.6282940c27f00.jpeg",
  freeShipping: true,
};

describe("pages/Product", () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should render the title of the Product", async () => {
    server.create("product", product as object);
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });
});
