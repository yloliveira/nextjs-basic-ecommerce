import React from "react";
import { useRouter } from "next/navigation";
import Search from "@/app/components/search";

export default function Header() {
  const router = useRouter();

  const onSubmitSearchForm = ({ text }: { text: string }) => {
    router.push(`/search&term=${text}`);
  };

  return (
    <header
      className="w-full h-28 bg-brandPrimary py-2 px-5 sm:mb-10 flex justify-center items-center"
      data-testid="header"
    >
      <div className="w-full max-w-7xl h-full flex flex-col justify-between">
        <Search onSubmit={onSubmitSearchForm} />
        <nav className="w-full h-8 flex justify-end items-center px-5">
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
            className="ml-5"
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
          </a>
        </nav>
      </div>
    </header>
  );
}
