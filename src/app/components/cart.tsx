import React from "react";

type Props = {
  onClickSeeMoreProducts: () => void;
};

export default function Cart({ onClickSeeMoreProducts }: Props) {
  return (
    <div className="" data-testid="cart-modal">
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
        onClick={() => {}}
      >
        Finalizar a compra
      </button>
    </div>
  );
}
