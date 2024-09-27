/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { Product } from "@/app/models/product";
import { useCartStore } from "@/app/stores/cart-store";
import Currency from "@/app/utils/currency";

type CartItemProps = {
  item: { product: Product; quantity: number };
  onClickRemove: (product: Product) => void;
  onClickDecrease: (product: Product) => void;
  onClickIncrease: (product: Product) => void;
};

export function CartItem({
  item,
  onClickRemove,
  onClickDecrease,
  onClickIncrease,
}: CartItemProps) {
  return (
    <div
      data-testid="cart-item"
      className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-b p-5 border-gray-200"
    >
      <div className="flex gap-5">
        <img
          alt={item.product.title}
          src={item.product.image}
          className="w-16 h-16"
        />

        <div className="h-full flex flex-col justify-between items-start">
          <h3 className="text-base font-semibold line-clamp-1">
            {item.product.title}
          </h3>
          <button
            onClick={() => onClickRemove(item.product)}
            className="font-semibold text-sm text-blue-500"
          >
            Excluir
          </button>
        </div>
      </div>

      <div className="w-full flex justify-between items-start">
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2">
          <div
            data-testid="quantity-stepper"
            className="border rounded-md border-gray-200 px-3 h-[32px] min-w-[70px] max-w-[90px] sm:max-w-[120px] flex gap-6 items-center justify-center"
          >
            <button
              onClick={() => onClickDecrease(item.product)}
              data-testid="decrease-quantity"
              className="text-blue-500 font-bold text-3xl"
            >
              <svg
                className="w-[16px] h-[16px] text-blue-500"
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
                  d="M5 12h14"
                />
              </svg>
            </button>
            <span data-testid="item-quantity" className="text-sm">
              {item.quantity}
            </span>
            <button
              data-testid="increase-quantity"
              onClick={() => onClickIncrease(item.product)}
            >
              <svg
                className="w-[16px] h-[16px] text-blue-500"
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
                  d="M5 12h14m-7 7V5"
                />
              </svg>
            </button>
          </div>
        </div>
        <span data-testid="item-total" className="text-xl font-medium">
          {Currency.format(item.product.price.originalAmount * item.quantity)}
        </span>
      </div>
    </div>
  );
}

export default function Cart() {
  const cartItems = useCartStore(state => state.state.items);
  const { remove } = useCartStore(state => state.actions);
  const productsTotal = cartItems.reduce((acc, cur) => {
    acc += cur.quantity * cur.product.price.originalAmount;
    return acc;
  }, 0);
  const shipping = 0;
  const total = productsTotal + shipping;

  const onClickRemove = (product: Product) => {
    remove(product);
  };

  const onClickDecrease = () => {};

  const onClickIncrease = () => {};

  return (
    <main className="w-full max-w-7xl grid grid-cols-7 mx-auto mt-5 md:mt-0 gap-5 lg:px-5">
      <section
        data-testid="cart-items-list"
        className="flex flex-col bg-white shadow col-span-7 lg:col-span-5 rounded-md mx-5 lg:mx-0"
      >
        <h1 className="p-5 text-lg font-bold border-b border-gray-200">
          Produtos
        </h1>
        {cartItems.map(item => (
          <CartItem
            item={item}
            key={item.product.slugId}
            onClickRemove={onClickRemove}
            onClickDecrease={onClickDecrease}
            onClickIncrease={onClickIncrease}
          />
        ))}
      </section>
      <section
        data-testid="purchase-summary"
        className="block overflow-auto bg-white shadow col-span-7 lg:col-span-2 lg:rounded-md"
        style={{
          height: "fit-content",
        }}
      >
        <h1 className="p-5 text-lg font-bold border-b border-gray-200">
          Resumo da compra
        </h1>
        <div className="p-5 flex flex-col gap-3">
          <div
            data-testid="products-total"
            className="flex justify-between text-sm font-light"
          >
            <span>{`Produtos(${cartItems.length})`} </span>
            <span>{Currency.format(productsTotal)}</span>
          </div>
          <div
            data-testid="shipping"
            className="flex justify-between text-sm font-light"
          >
            <span>frete </span>
            <span>{Currency.format(shipping)}</span>
          </div>
          <div
            data-testid="total"
            className="flex justify-between font-semibold text-lg  font-light"
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
        </div>
      </section>
    </main>
  );
}
