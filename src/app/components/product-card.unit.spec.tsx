import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./product-card";

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

const onClick = jest.fn();

describe("components/ProductCard", () => {
  it("should render the props.product.image", () => {
    render(<ProductCard onClick={onClick} product={product} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveProperty("src", product.image);
    expect(screen.getByRole("img")).toHaveProperty("alt", product.title);
  });

  it("should render the props.product.title", () => {
    render(<ProductCard onClick={onClick} product={product} />);

    expect(
      screen.getByText(new RegExp(product.title, "i"))
    ).toBeInTheDocument();
  });

  it("should render the props.product.price", () => {
    render(<ProductCard onClick={onClick} product={product} />);

    expect(screen.getByTestId("original-amount")).toHaveTextContent(
      "R$ 4.990,00"
    );
  });

  it("should render the props.product.price formatted to BRL currency", () => {
    render(<ProductCard onClick={onClick} product={product} />);

    expect(screen.getByTestId("original-amount")).toBeInTheDocument();
  });

  it("should render free shipping text if the props.product.freeShipping is true", () => {
    render(<ProductCard onClick={onClick} product={product} />);

    expect(screen.getByTestId("freeShipping")).toBeInTheDocument();
  });

  it("should not render free shipping text if the props.product.freeShipping is false", () => {
    const product2 = { ...product, freeShipping: false };
    render(<ProductCard onClick={onClick} product={product2} />);

    expect(screen.queryByTestId("freeShipping")).toBeNull();
  });

  it("should render number of installments without taxes information if quantity is greater than 1", () => {
    render(<ProductCard onClick={onClick} product={product} />);

    const textToMatch = product.price.numberOfInstallmentsWithoutTaxes + "x";

    expect(screen.queryByTestId("installmentsText")).toHaveTextContent(
      new RegExp(textToMatch, "i")
    );
  });

  it("should not render number of installments without taxes information if quantity is 1", () => {
    const product2 = {
      ...product,
      price: { ...product.price, numberOfInstallmentsWithoutTaxes: 1 },
    };
    render(<ProductCard onClick={onClick} product={product2} />);

    expect(screen.queryByTestId("installmentsText")).not.toBeInTheDocument();
  });

  it("should render installment value if installments quantity is greater than 1", () => {
    render(<ProductCard onClick={onClick} product={product} />);

    const textToMatch = String(product.price.installmentValue);

    expect(screen.queryByTestId("installmentsText")).toHaveTextContent(
      new RegExp(textToMatch, "i")
    );
  });

  it("should render installment value formatted to BRL currency", () => {
    render(<ProductCard onClick={onClick} product={product} />);

    const textToMatch = String("R\\$ 499,00");

    expect(screen.queryByTestId("installmentsText")).toHaveTextContent(
      new RegExp(textToMatch, "i")
    );
  });

  it("should call props.onClick with the product slugId", () => {
    render(<ProductCard onClick={onClick} product={product} />);

    fireEvent.click(screen.getByTestId("product-card"));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(product.slugId);
  });
});
