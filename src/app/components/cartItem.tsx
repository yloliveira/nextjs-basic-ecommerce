/* eslint-disable @next/next/no-img-element */
import { Product } from "@/app/models/product";
import Currency from "@/app/utils/currency";

type CartItemProps = {
  item: { product: Product; quantity: number };
  onClickRemove: (item: { product: Product; quantity: number }) => void;
  onClickDecrease: (product: Product) => void;
  onClickIncrease: (product: Product) => void;
};

export default function CartItem({
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
            onClick={() => onClickRemove(item)}
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
