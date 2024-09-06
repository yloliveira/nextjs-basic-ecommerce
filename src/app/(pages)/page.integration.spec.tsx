import { render, screen, waitFor } from "@testing-library/react";
import { Response, Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import Home from "./page";

describe("pages/Home", () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });
  it("should render Search form component", () => {
    render(<Home />);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveProperty("name", "search-form");
  });

  it("should render the ProductList", () => {
    render(<Home />);
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  it("should render the ProductCard 10 times", async () => {
    server.createList("product", 10);
    render(<Home />);

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(10);
    });
  });

  it("should render the no-products message and shouldn't render the error and product-quantity messages, neither the product list", async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("no-product")).toBeInTheDocument();
      expect(screen.queryAllByTestId("product-card")).toHaveLength(0);
      expect(screen.queryByTestId("products-quantity")).not.toBeInTheDocument();
    });
  });

  it("should display the error message when promise rejects and shouldn't render the no-products and product-quantity messages, neither the product list", async () => {
    server.get("products", () => {
      return new Response(500, {}, "");
    });
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("fetch-error")).toBeInTheDocument();
      expect(screen.queryByTestId("no-product")).not.toBeInTheDocument();
      expect(screen.queryAllByTestId("product-card")).toHaveLength(0);
      expect(screen.queryByTestId("products-quantity")).not.toBeInTheDocument();
    });
  });

  it("should display the total quantity of products and shouldn't render the error and no-products messages", async () => {
    server.createList("product", 10);
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("products-quantity")).toBeInTheDocument();
      expect(screen.getByTestId("products-quantity")).toHaveTextContent(
        new RegExp("10", "i")
      );
      expect(screen.queryByTestId("fetch-error")).not.toBeInTheDocument();
      expect(screen.queryByTestId("no-product")).not.toBeInTheDocument();
    });
  });
});
