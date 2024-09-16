import React from "react";

export default function BuyBox() {
  return (
    <div
      data-testid="buy-box"
      className="sm:border rounded-lg sm:border-gray-200 flex flex-col justify-between sm:p-5 gap-2"
    >
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <div>
        <button
          data-testid="buy-now"
          className="w-full h-12 bg-blue-500 rounded-md text-white font-semibold text-base"
        >
          Comprar agora
        </button>
        <button
          data-testid="add-to-cart"
          className="w-full h-12 rounded-md font-semibold text-base text-blue-500 bg-blue-50"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}
