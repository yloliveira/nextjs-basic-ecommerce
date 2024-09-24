import React from "react";
import { useRouter } from "next/navigation";
import Search from "@/app/components/search";
import { useCartStore } from "@/app/stores/cart-store";

export default function Header() {
  const router = useRouter();
  const cartItems = useCartStore(state => state.state.items);

  const onSubmitSearchForm = ({ text }: { text: string }) => {
    router.push(`/search&term=${text}`);
  };

  return (
    <header
      className="w-full h-28 bg-brandPrimary py-2 px-5 sm:mb-10 flex justify-center items-center"
      data-testid="header"
    >
      <div className="w-full max-w-7xl h-full flex flex-col justify-between">
        <div className="flex">
          <div className="flex items-center" data-testid="logo">
            <div className="text-3xl h-10 w-16 border border-b-4 border-brandSecondary rounded-[50%_/_50%] flex item-center justify-center bg-yellow-400 text-white mr-1">
              <svg
                data-name="Layer 1"
                id="Layer_1"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                fill="#2d3277"
              >
                <path d="M502.13,189a6,6,0,0,0-8.23-2.05l-47.5,28.53a6,6,0,0,0-2.65,3.45l-10.12,34.6c-.36-.16-.72-.33-1.09-.48L291.73,179.32a6,6,0,0,0-6.64.74c-.33.28-32.68,27.71-60.32,49.52-17.58,13.86-34.11,7.7-41.88,3.23l47.46-65.21a74.38,74.38,0,0,1,66.32-30.21l73,7.88a6,6,0,0,0,4.48-1.35l43.65-36.4a6,6,0,0,0-7.67-9.2l-41.7,34.76-70.62-7.61a86.4,86.4,0,0,0-49.32,10.58l-96.65,1.1-41.82-35.94a6,6,0,0,0-7.81,9.09l43.53,37.41a6,6,0,0,0,3.91,1.45h.07l81.88-.94a85.47,85.47,0,0,0-11,12.33l-51.08,70.21a6,6,0,0,0,1,8.09c10.28,8.74,36.41,20,61.64.14C255,221,281,199.21,289.76,191.8l137.79,72.08a23.88,23.88,0,0,1,5.77,3.32l.14.11a24.77,24.77,0,0,1,9.19,16c1.12,8-1.72,15.28-7.82,20a22.82,22.82,0,0,1-9.33,4.26c-21.34,4.4-73.89-17.24-92.36-26A6,6,0,1,0,328,292.43c2.26,1.07,45,21.11,77.39,26.38-.54,2.94-3.66,17.46-13.67,24.34-5.26,3.64-11.63,4.57-19.43,2.83-33.88-7.52-69.53-20.2-69.89-20.32a6,6,0,0,0-4,11.27c.35.13,33,11.75,65.94,19.52-1.84,8.24-8.54,23.43-32.91,22.77-36-1.2-56.18-15.39-56.38-15.53a6,6,0,0,0-7,9.69c.7.52,13.75,9.78,37.51,14.77-11.21,9.3-32.53,22.08-55.67,10.33-9.57-4.87-15.33-7.82-18.78-9.62a1,1,0,0,1-.11-.1A124,124,0,0,0,249.69,374a5.85,5.85,0,0,0,1.27-1.87c.21-.51,5.21-12.49-.7-24.24-3.95-7.87-11.62-13.49-22.74-16.8-2.62-8-10.7-27.06-29.05-30.6a33.63,33.63,0,0,0-6.73-16.58c-6.88-9-18.13-14.85-33.42-17.54-1.5-14-20-27.13-31-32.8h0c-19.11-9.81-63.07,8.38-81.77,17L19.33,223.2a6,6,0,1,0-8.65,8.28L35,256.93c-7.63,6.56-12.3,16.2-8,26.46C30.19,291,42.18,304.87,55.52,310A37.93,37.93,0,0,0,66,312.22c3.51,12.29,13.35,30.63,31.59,35.71,3.41,11.84,14.63,28.81,39.4,30.7,3.31,11.73,14.64,27.55,41.57,27.55.64,0,1.3,0,1.95,0,14.4-.4,27.69-5,38.71-10.58.46.34,1,.69,1.59,1.07l-.06.14,1,.45c4.18,2.52,11.24,6.11,22.69,11.93a53,53,0,0,0,24.29,5.91c22.22,0,41.75-13.79,52-24.61,3.32.34,6.73.61,10.34.73.76,0,1.52,0,2.26,0,28.53,0,39.85-18.59,42.86-32.58,1.12.09,2.24.16,3.33.16A32.89,32.89,0,0,0,398.6,353c15.24-10.53,18.56-31.57,18.76-32.94.64,0,1.29.05,1.91.05a42.51,42.51,0,0,0,8.68-.8,34.59,34.59,0,0,0,14.21-6.5,33,33,0,0,0,12.35-31.13,37.11,37.11,0,0,0-10.48-21l10.55-36.1,45.5-27.32A6,6,0,0,0,502.13,189ZM38,278.76c-2.86-6.86,4.32-13.1,8.68-15.53,23.44-11.23,51-20.57,66.5-20.57a19.38,19.38,0,0,1,8.6,1.57c14.62,7.5,24.56,18.38,24.67,23.84,0,.66,0,2-2.81,3.63l-3.32,1.9c-16,9.17-58.57,33.52-80.58,25.16C49.92,295,40.1,283.68,38,278.76Zm40.39,33c24.95-3.25,53.6-19.62,67.88-27.8l3.26-1.86a19.49,19.49,0,0,0,5.25-4.24c27.72,4.36,31.56,18.69,31.91,24.7-17.13,11.08-58.07,34.72-79.12,34.72C89.83,337.31,81.56,320.62,78.43,311.79Zm32.45,37.36c28.2-2.19,73.83-31,83.35-37.15,12.7,1.24,19.13,15,21.52,21.72-10.83,8-46.66,32.95-73.89,33.11h-.31C122.7,366.83,114.4,356.51,110.88,349.15Zm69.26,45c-20.38.72-27.91-9.09-30.69-15.89,30.54-3.91,65.12-28.64,74.54-35.76,7.84,2.3,13.08,5.87,15.52,10.65,2.7,5.27,1.45,11,.77,13.26C235.14,371.18,209.66,393.36,180.14,394.17Z" />
              </svg>
            </div>
            <span className="leading-[13px] hidden sm:inline text-xl font-semibold text-brandSecondary">
              mercado preso
            </span>
          </div>
          <Search onSubmit={onSubmitSearchForm} />
        </div>
        <nav className="w-full h-8 flex justify-end items-center">
          <ul className="flex gap-5 text-sm">
            <li>
              <a href="/registration" role="link">
                Crie sua conta
              </a>
            </li>
            <li>
              <a href="/login" role="link">
                Entre
              </a>
            </li>
            <li>
              <a href="/purchases" role="link">
                Compras
              </a>
            </li>
          </ul>
          <a
            href="/cart"
            role="link"
            className="ml-5 relative"
            aria-describedby="carrinho"
          >
            <span hidden id="carrinho">
              Carrinho
            </span>
            <svg
              className="w-[25px] h-[25px] text-black"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
              />
            </svg>
            {cartItems.length > 0 && (
              <div
                data-testid="cart-badge"
                className="absolute top-0 right-0 rounded bg-red-600 text-[9px] flex items-center justify-center w-min px-0.5 text-white font-semibold min-w-3.5"
              >
                {cartItems.length}
              </div>
            )}
          </a>
        </nav>
      </div>
    </header>
  );
}
