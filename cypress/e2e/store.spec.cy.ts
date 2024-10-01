/// <reference types="cypress" />

context("Store", () => {
  it("should display the store", () => {
    cy.visit("/");

    cy.get("body").contains("mercado preso");
    cy.get("body").contains("Ofertas do dia");
  });

  context("Search for products", () => {
    it("should type in the search form", () => {
      cy.visit("/");

      cy.get("input[type='search']")
        .type("Some text")
        .should("have.value", "Some text");
    });

    it("should navigate to the search page after submitting the search form", () => {
      cy.visit("/");

      cy.get("input[type='search']").type("Some text");
      cy.get("form[name='search-form']").submit();

      cy.location("pathname").should("match", /\/search&term=Some%20text$/);
    });
  });

  context("Header", () => {
    it("should display the nav links", () => {
      cy.visit("/");

      cy.get('a[href*="/registration"]').should("exist");
      cy.get('a[href*="/login"]').should("exist");
      cy.get('a[href*="/purchases"]').should("exist");
      cy.get('a[href*="/cart"]').should("exist");
    });
  });

  context("Products List", () => {
    it("should display the products list", () => {
      cy.visit("/");

      cy.get("div[data-testid='product-card']").should("have.length", 25);
    });

    it("should navigate to the correct product page on click product card", () => {
      cy.visit("/");

      cy.get("div[data-testid='product-card']").first().click();

      cy.location("pathname").should(
        "match",
        /\/product\/cavus-deripio-beatae-comedo-approbo$/
      );
    });
  });
});
