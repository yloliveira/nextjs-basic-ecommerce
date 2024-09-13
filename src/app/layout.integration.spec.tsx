import { render, screen } from "@testing-library/react";
import { Body } from "./layout";

const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("app/Layout", () => {
  it("should render the Header component", async () => {
    render(
      <Body>
        <div />
      </Body>
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
