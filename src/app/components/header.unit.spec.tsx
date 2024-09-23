import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import Header from "./header";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("components/Header", () => {
  let server: Server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
  });

  it("should render a logo", () => {
    render(<Header />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("should render Search form component", () => {
    render(<Header />);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByRole("form")).toHaveProperty("name", "search-form");
  });

  it("should render nav component", () => {
    render(<Header />);
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /crie sua conta/i })
    ).toHaveAttribute("href", "/registration");
    expect(screen.getByRole("link", { name: /entre/i })).toHaveAttribute(
      "href",
      "/login"
    );
    expect(screen.getByRole("link", { name: /compras/i })).toHaveAttribute(
      "href",
      "/purchases"
    );
    expect(
      screen.getByRole("link", { description: /carrinho/i })
    ).toHaveAttribute("href", "/cart");
  });

  it("should call router.push() with the url containing the correct term for search", async () => {
    const searchTerm = "Product Title";

    server.createList("product", 2);
    render(<Header />);

    const form = screen.getByRole("form");
    const input = screen.getByRole("searchbox");

    await userEvent.type(input, searchTerm);
    fireEvent.submit(form);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith(`/search&term=${searchTerm}`);
      expect(pushMock).toHaveBeenCalledTimes(1);
    });
  });
});
