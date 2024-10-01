/// <reference types="cypress" />

context("Home Page", () => {
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
    it("should display the brand logo", () => {
      cy.visit("/");

      cy.get('div[data-testid="logo"]').should("exist");
      cy.get('div[data-testid="logo"]').contains("mercado preso");
    });

    it("should display the search form", () => {
      cy.visit("/");

      cy.get("input[type='search']").should("exist");
    });

    it("should display the nav links", () => {
      cy.visit("/");

      cy.get('a[href*="/registration"]').should("exist");
      cy.get('a[href*="/login"]').should("exist");
      cy.get('a[href*="/purchases"]').should("exist");
      cy.get('a[href*="/cart"]').should("exist");
    });

    it("should navigate to the home page on click in the brand logo", () => {
      cy.visit("/");

      cy.get('div[data-testid="logo"]').click();

      cy.location("pathname").should("match", /\/$/);
    });

    it("should navigate to the registration page on click in the registration link", () => {
      cy.visit("/");

      cy.get('a[href*="/registration"]').click();

      cy.location("pathname").should("match", /\/registration$/);
    });

    it("should navigate to the login page on click in the login link", () => {
      cy.visit("/");

      cy.get('a[href*="/login"]').click();

      cy.location("pathname").should("match", /\/login$/);
    });

    it("should navigate to the purchases page on click in the purchases link", () => {
      cy.visit("/");

      cy.get('a[href*="/purchases"]').click();

      cy.location("pathname").should("match", /\/purchases$/);
    });

    it("should navigate to the cart page on click in the cart link", () => {
      cy.visit("/");

      cy.get('a[href*="/cart"]').click();

      cy.location("pathname").should("match", /\/cart$/);
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
