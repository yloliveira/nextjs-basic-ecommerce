import React from "react";

type Props = {
  isOpen: boolean;
  onClickSeeMoreProducts: () => void;
  onClickCheckout: () => void;
  onClickClose: () => void;
};

export default function CartModal({
  isOpen,
  onClickSeeMoreProducts,
  onClickCheckout,
  onClickClose,
}: Props) {
  return (
    <div
      className={`${
        !isOpen && "hidden"
      } fixed w-screen h-screen top-0 right-0 left-0 z-50 bg-opacity-50 bg-black flex justify-end`}
      data-testid="cart-modal"
    >
      <div className="w-full h-full max-w-md bg-white flex flex-col justify-between items-end p-5">
        <div
          data-testid="close"
          className="cursor-pointer"
          onClick={() => onClickClose()}
        >
          <svg
            className="w-6 h-6 text-gray-600"
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
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </div>
        <span
          data-testid="success-message"
          className="w-full text-2xl font-semibold text-success flex flex-col justify-center items-center"
        >
          <svg
            className="w-[80px] h-[80px] text-success self-center"
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
              strokeWidth="2"
              d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          Adicionado ao carrinho
        </span>
        <div className="w-full">
          <button
            data-testid="see-more-products"
            className="w-full h-12 bg-blue-500 rounded-md text-white font-semibold text-base mb-2"
            onClick={() => onClickSeeMoreProducts()}
          >
            Ver mais produtos
          </button>
          <button
            data-testid="checkout"
            className="w-full h-12 rounded-md font-semibold text-base text-blue-500 bg-blue-50"
            onClick={() => onClickCheckout()}
          >
            Finalizar a compra
          </button>
        </div>
      </div>
    </div>
  );
}
