/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImgHTMLAttributes, ClassAttributes } from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => <img {...props} />,
}));

export const nextNavigationPushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: nextNavigationPushMock,
  }),
}));
