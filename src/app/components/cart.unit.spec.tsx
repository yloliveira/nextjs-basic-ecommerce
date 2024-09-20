import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./cart";

const onClickSeeMoreProducts = jest.fn();

describe("components/Cart", () => {
  beforeEach(() => {
    render(<Cart onClickSeeMoreProducts={onClickSeeMoreProducts} />);
  });

  it("should render a 'see more products' button", async () => {
    expect(screen.getByTestId("see-more-products")).toBeInTheDocument();
  });

  it("should render a 'checkout' button", async () => {
    expect(screen.getByTestId("checkout")).toBeInTheDocument();
  });

  it("should call props.onClickSeeMoreProducts()", () => {
    const [seeMoreProductsButton] = screen.getAllByRole("button");
    fireEvent.click(seeMoreProductsButton);
    expect(onClickSeeMoreProducts).toHaveBeenCalledTimes(1);
  });
});
