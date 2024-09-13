import { Factory } from "miragejs";
import { faker } from "@faker-js/faker";
import { ProductPrice } from "@/app/models/product";

export const productFactory = Factory.extend({
  slugId(): string {
    return faker.lorem.slug(5);
  },
  title(): string {
    return faker.commerce.productName();
  },
  description(): string {
    return faker.commerce.productDescription();
  },
  price(): ProductPrice {
    const originalAmount = Number(faker.commerce.price());
    const numberOfInstallmentsWithoutTaxes = faker.number.int({
      min: 1,
      max: 12,
    });
    const installmentValue = originalAmount / numberOfInstallmentsWithoutTaxes;

    return {
      originalAmount,
      numberOfInstallmentsWithoutTaxes,
      installmentValue,
    };
  },
  image(): string {
    return faker.image.urlLoremFlickr();
  },
  freeShipping: faker.datatype.boolean(),
});
