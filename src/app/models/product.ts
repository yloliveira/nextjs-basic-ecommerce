export type Product = {
  slugId: string;
  title: string;
  description: string;
  price: ProductPrice;
  image: string;
  freeShipping: boolean;
};

export type ProductPrice = {
  originalAmount: number;
  numberOfInstallmentsWithoutTaxes: number;
  installmentValue: number;
};
