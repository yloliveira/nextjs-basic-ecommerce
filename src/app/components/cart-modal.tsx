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
          X
        </div>
        <div className="w-full">
          <button
            data-testid="see-more-products"
            className="w-full h-12 bg-blue-500 rounded-md text-white font-semibold text-base"
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
