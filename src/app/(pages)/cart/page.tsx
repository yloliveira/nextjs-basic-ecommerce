"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/app/models/product";
import { useCartStore } from "@/app/stores/cart-store";
import Currency from "@/app/utils/currency";
import CartItem from "@/app/components/cartItem";

export default function Cart() {
  const router = useRouter();
  const cartItems = useCartStore(state => state.state.items);
  const { add, remove } = useCartStore(state => state.actions);
  const productsTotal = cartItems.reduce((acc, cur) => {
    acc += cur.quantity * cur.product.price.originalAmount;
    return acc;
  }, 0);
  const shipping = 0;
  const total = productsTotal + shipping;

  const onClickRemove = (item: { product: Product; quantity: number }) => {
    remove(item);
  };

  const onClickDecrease = (product: Product) => {
    remove({ product, quantity: 1 });
  };

  const onClickIncrease = (product: Product) => {
    add({ product, quantity: 1 });
  };

  const onClickCheckout = () => {
    if (!sessionStorage.getItem("session_id")) {
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };

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
            onClick={onClickCheckout}
            disabled={cartItems.length === 0}
          >
            Continuar a compra
          </button>
        </div>
      </section>
    </main>
  );
}
