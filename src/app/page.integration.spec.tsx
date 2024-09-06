import { render, screen, waitFor } from "@testing-library/react";
import { Server } from "miragejs";
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
});
