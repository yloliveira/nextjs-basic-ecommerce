import {
  render,
  screen,
  waitFor,
  fireEvent,
  renderHook,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Server } from "miragejs";
import { makeServer } from "@/mock-api/miragejs/server";
import { useCartStore, useCartStoreProps } from "@/app/stores/cart-store";
import { Product } from "@/app/models/product";
import Header from "./header";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("components/Header", () => {
  let server: Server;
  let result: { current: useCartStoreProps };

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    result = renderHook(() => useCartStore()).result;
  });

  afterEach(() => {
    server.shutdown();
    jest.clearAllMocks();
    act(() => result.current.actions.reset());
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

  it("should show a badge in the cart icon with the quantity of products inside the cart if the quantity is greater than 0", () => {
    render(<Header />);
    const product = server.create("product").attrs as Product;
    act(() => result.current.actions.add(product));

    expect(screen.getByTestId("cart-badge")).toBeInTheDocument();
    expect(screen.getByTestId("cart-badge")).toHaveTextContent("1");
  });

  it("should not show a badge in the cart icon if the quantity is lower than 1", () => {
    render(<Header />);
    expect(screen.queryByTestId("cart-badge")).not.toBeInTheDocument();
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
