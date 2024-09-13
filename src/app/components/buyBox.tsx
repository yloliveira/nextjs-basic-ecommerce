import React from "react";

export default function BuyBox() {
  return (
    <div data-testid="buy-box">
      <select>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button data-testid="buy-now">Comprar agora</button>
      <button data-testid="add-to-cart">Adicionar ao carrinho</button>
    </div>
  );
}
