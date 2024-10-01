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

      const textToMatch = `/search&term=Some text`;

      cy.location("pathname").should("match", /\/search&term=Some%20text$/);
    });
  });
});
