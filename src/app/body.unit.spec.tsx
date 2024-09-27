import { render, screen } from "@testing-library/react";
import Body from "./body";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("app/Body", () => {
  it("should render the Header component", async () => {
    render(
      <Body>
        <div />
      </Body>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("should render the children component", async () => {
    const children = "children";
    render(
      <Body>
        <div data-testid={children} />
      </Body>
    );
    expect(screen.getByTestId(children)).toBeInTheDocument();
  });

  it("should render the Footer component", async () => {
    render(
      <Body>
        <div />
      </Body>
    );
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
