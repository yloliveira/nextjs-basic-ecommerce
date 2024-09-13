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
    server.create("product", product as object);
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should render the title of the Product", async () => {
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      expect(screen.getByText(product.title)).toBeInTheDocument();
    });
  });

  it("should render the props.product.price", async () => {
    render(<Product params={{ slugId: product.slugId }} />);
    await waitFor(() => {
      expect(screen.getByTestId("original-amount")).toHaveTextContent(
        "R$ 4.990,00"
      );
    });
  });

  it("should render the props.product.price formatted to BRL currency", async () => {
    render(<Product params={{ slugId: product.slugId }} />);
    await waitFor(() => {
      expect(screen.getByTestId("original-amount")).toBeInTheDocument();
    });
  });
});
