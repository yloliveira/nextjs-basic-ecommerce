import { render, screen } from "@testing-library/react";
import ProductCard from "./product-card";

const product = {
  title: "product title",
  price: 4990,
  image:
    "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/0286e0143870775.6282940c27f00.jpeg",
};

beforeEach(() => {
  render(<ProductCard product={product} />);
});

describe("components/ProductCard", () => {
  it("should render the props.product.image", async () => {
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveProperty("alt", product.title);
  });

  it("should render the props.product.title", async () => {
    expect(
      screen.getByText(new RegExp(product.title, "i"))
    ).toBeInTheDocument();
  });

  it("should render the props.product.price", async () => {
    expect(screen.getByText(product.price)).toBeInTheDocument();
  });
});
