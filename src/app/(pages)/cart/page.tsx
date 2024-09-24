"use client";
import React from "react";

export default function Cart() {
  return (
    <main className="w-full max-w-7xl grid grid-cols-7 mx-auto mt-5 md:mt-0 gap-5 lg:px-5">
      <section
        data-testid="cart-items-list"
        className="bg-white p-5 shadow col-span-7 lg:col-span-5 rounded-md mx-5 lg:mx-0"
      ></section>
    </main>
  );
}
