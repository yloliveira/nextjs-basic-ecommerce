import { render, screen } from "@testing-library/react";
import ProductCard from "./product-card";

const product = {
  title: "product title",
  price: 4990,
  image:
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0286e0143870775.6282940c27f00.jpeg",
  freeShipping: true,
  numberOfInstallmentsWithoutTaxes: 10,
};

describe("components/ProductCard", () => {
  it("should render the props.product.image", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveProperty("alt", product.title);
  });

  it("should render the props.product.title", () => {
    render(<ProductCard product={product} />);

    expect(
      screen.getByText(new RegExp(product.title, "i"))
    ).toBeInTheDocument();
  });

  it("should render the props.product.price", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText(product.price)).toBeInTheDocument();
  });

  it("should render free shipping text if the props.product.freeShipping is true", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByTestId("freeShipping")).toBeInTheDocument();
  });

  it("should not render free shipping text if the props.product.freeShipping is false", () => {
    const product2 = { ...product, freeShipping: false };
    render(<ProductCard product={product2} />);

    expect(screen.queryByTestId("freeShipping")).toBeNull();
  });

  it("should render number of installments without taxes information if quantity is greater than 1", () => {
    render(<ProductCard product={product} />);

    const textToMatch = product.numberOfInstallmentsWithoutTaxes + "x";

    expect(
      screen.queryByText(new RegExp(textToMatch, "i"))
    ).toBeInTheDocument();
  });

  it("should not render number of installments without taxes information if quantity is 1", () => {
    const product2 = { ...product, numberOfInstallmentsWithoutTaxes: 1 };
    render(<ProductCard product={product2} />);

    const textToMatch = product.numberOfInstallmentsWithoutTaxes + "x";

    expect(screen.queryByText(new RegExp(textToMatch, "i"))).toBeNull();
  });
});
