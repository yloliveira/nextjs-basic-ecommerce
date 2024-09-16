/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { useFetchProduct } from "@/app/hooks/useFetchProduct";
import Currency from "@/app/utils/currency";
import BuyBox from "@/app/components/buyBox";

export default function Product({ params }: { params: { slugId: string } }) {
  const { product } = useFetchProduct(params.slugId);

  if (!product) {
    return null;
  }

  return (
    <main className="flex flex-col items-center justify-between gap-10 sm:px-5">
      <section className="bg-white w-full max-w-7xl p-5 shadow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 sm:rounded-md">
        <img
          alt={product.title}
          src={product.image}
          className="w-full h-auto"
        />
        <div>
          <h1>{product.title}</h1>
          <h3 data-testid="original-amount" className="text-lg font-semibold">
            {Currency.format(product.price.originalAmount)}
          </h3>
          {product.price.numberOfInstallmentsWithoutTaxes > 1 && (
            <div data-testid="installmentsText" className="text-xs font-light">
              {`em ${
                product.price.numberOfInstallmentsWithoutTaxes
              }x ${Currency.format(product.price.installmentValue)} sem juros`}
            </div>
          )}
        </div>
        <div className="md:col-span-2 lg:col-span-1">
          <BuyBox />
        </div>
        <div className="md:col-span-2">
          <h3 className="text-xl mb-5">
            O que você precisa saber sobre este produto
          </h3>
          <p className="text-base">{product.description}</p>
        </div>
      </section>
    </main>
  );
}
