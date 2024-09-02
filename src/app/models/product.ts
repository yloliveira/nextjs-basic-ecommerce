export type Product = {
  slugId: string;
  title: string;
  price: ProductPrice;
  image: string;
  freeShipping: boolean;
};

export type ProductPrice = {
  originalAmount: number;
  numberOfInstallmentsWithoutTaxes: number;
  installmentValue: number;
};
