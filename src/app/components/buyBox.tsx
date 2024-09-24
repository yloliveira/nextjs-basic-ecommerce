import React from "react";

type Props = {
  onClickBuyNow: () => void;
  onClickAddToCart: () => void;
  onChangeQuantity: (quantity: number) => void;
};

export default function BuyBox({
  onClickBuyNow,
  onClickAddToCart,
  onChangeQuantity,
}: Props) {
  return (
    <div
      data-testid="buy-box"
      className="sm:border rounded-lg sm:border-gray-200 flex flex-col justify-between sm:p-5 gap-2"
    >
      <div>
        <label htmlFor="quantity-select">Quantidade: </label>
        <select
          className="bg-transparent font-semibold mb-5"
          onChange={event => onChangeQuantity(Number(event.target.value))}
          id="quantity-select"
        >
          <option value="1">1 unidade</option>
          <option value="2">2 unidades</option>
          <option value="3">3 unidades</option>
          <option value="4">4 unidades</option>
          <option value="5">5 unidades</option>
        </select>
      </div>
      <div>
        <button
          data-testid="buy-now"
          className="w-full h-12 bg-blue-500 rounded-md text-white font-semibold text-base mb-2"
          onClick={() => onClickBuyNow()}
        >
          Comprar agora
        </button>
        <button
          data-testid="add-to-cart"
          className="w-full h-12 rounded-md font-semibold text-base text-blue-500 bg-blue-50"
          onClick={() => onClickAddToCart()}
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
