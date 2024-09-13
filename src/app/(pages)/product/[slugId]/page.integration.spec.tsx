import { render, screen, waitFor } from "@testing-library/react";
import { Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import Product from "./page";

const product = {
  slugId: "product_title",
  title: "product title",
  description: "Product description",
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

  it("should render number of installments without taxes information if quantity is greater than 1", async () => {
    render(<Product params={{ slugId: product.slugId }} />);

    const textToMatch = product.price.numberOfInstallmentsWithoutTaxes + "x";

    await waitFor(() => {
      expect(screen.queryByTestId("installmentsText")).toHaveTextContent(
        new RegExp(textToMatch, "i")
      );
    });
  });

  it("should not render number of installments without taxes information if quantity is 1", async () => {
    const product2 = {
      ...product,
      slugId: "slugId-2",
      price: { ...product.price, numberOfInstallmentsWithoutTaxes: 1 },
    };
    server.create("product", product2 as object);
    render(<Product params={{ slugId: product2.slugId }} />);

    await waitFor(() => {
      expect(screen.queryByTestId("installmentsText")).not.toBeInTheDocument();
    });
  });

  it("should render installment value if installments quantity is greater than 1", async () => {
    render(<Product params={{ slugId: product.slugId }} />);

    const textToMatch = String(product.price.installmentValue);

    await waitFor(() => {
      expect(screen.queryByTestId("installmentsText")).toHaveTextContent(
        new RegExp(textToMatch, "i")
      );
    });
  });

  it("should render installment value formatted to BRL currency", async () => {
    render(<Product params={{ slugId: product.slugId }} />);

    const textToMatch = String("R\\$ 499,00");

    await waitFor(() => {
      expect(screen.queryByTestId("installmentsText")).toHaveTextContent(
        new RegExp(textToMatch, "i")
      );
    });
  });

  it("should render the description of the Product", async () => {
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      expect(screen.getByText(product.description)).toBeInTheDocument();
    });
  });

  it("should render the image of the product", async () => {
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
      expect(screen.getByRole("img")).toHaveProperty("src", product.image);
      expect(screen.getByRole("img")).toHaveProperty("alt", product.title);
    });
  });

  it("should render the BuyBox component", async () => {
    render(<Product params={{ slugId: product.slugId }} />);

    await waitFor(() => {
      expect(screen.getByTestId("buy-box")).toBeInTheDocument();
    });
  });
});
