"use client";
import React from "react";
import { Product } from "@/app/models/product";
import { useCartStore } from "@/app/stores/cart-store";
import Currency from "@/app/utils/currency";

function CartItem({ item }: { item: { product: Product; quantity: number } }) {
  return <div data-testid="cart-item"></div>;
}

export default function Cart() {
  const cartItems = useCartStore(state => state.state.items);
  const productsTotal = cartItems.reduce((acc, cur) => {
    acc += cur.quantity * cur.product.price.originalAmount;
    return acc;
  }, 0);
  const shipping = 0;
  const total = productsTotal + shipping;

  return (
    <main className="w-full max-w-7xl grid grid-cols-7 mx-auto mt-5 md:mt-0 gap-5 lg:px-5">
      <section
        data-testid="cart-items-list"
        className="bg-white p-5 shadow col-span-7 lg:col-span-5 rounded-md mx-5 lg:mx-0"
      >
        {cartItems.map(item => (
          <CartItem item={item} key={item.product.slugId} />
        ))}
      </section>
      <section
        data-testid="purchase-summary"
        className="bg-white p-5 shadow col-span-7 lg:col-span-2 lg:rounded-md flex flex-col gap-3"
      >
        <div
          data-testid="products-total"
          className="flex justify-between text-sm"
        >
          <span>{`Produtos(${cartItems.length})`} </span>
          <span>{Currency.format(productsTotal)}</span>
        </div>
        <div
          data-testid="total"
          className="flex justify-between font-semibold text-lg"
        >
          <span>Total </span>
          <span>{Currency.format(total)}</span>
        </div>
        <button
          className="w-full h-12 bg-blue-500 rounded-md text-white font-semibold text-base mb-2"
          onClick={() => {}}
        >
          Continuar a compra
        </button>
      </section>
    </main>
  );
}
