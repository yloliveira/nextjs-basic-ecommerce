import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Response, Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import Home from "./page";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

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
    });
  });

  it("should filter the product when a search is performed", async () => {
    const searchTerm = "Product Title";

    server.createList("product", 2);
    server.create("product", {
      title: searchTerm,
    } as object);
    render(<Home />);

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(3);
    });

    const form = screen.getByRole("form");
    const input = screen.getByRole("searchbox");

    await userEvent.type(input, searchTerm);
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(1);
      expect(screen.getByText(new RegExp(searchTerm, "i"))).toBeInTheDocument();
    });
  });

  it("should call router.push() with the url containing the correct product slugId when the product is clicked", async () => {
    const slugId = "product_slugId";
    server.create("product", {
      slugId,
    } as object);
    render(<Home />);

    await waitFor(() => {
      fireEvent.click(screen.getByTestId("product-card"));
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(`/product/${slugId}`);
      expect(pushMock).toHaveBeenCalledTimes(1);
    });
  });
});
