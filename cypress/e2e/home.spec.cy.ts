context("Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the store", () => {
    cy.get("body").contains("mercado preso");
    cy.get("body").contains("Ofertas do dia");
  });

  context("Search for products", () => {
    it("should type in the search form", () => {
      cy.get("input[type='search']")
        .type("Some text")
        .should("have.value", "Some text");
    });

    it("should navigate to the search page after submitting the search form", () => {
      cy.get("input[type='search']").type("Some text");
      cy.get("form[name='search-form']").submit();
      cy.location("pathname").should("match", /\/search&term=Some%20text$/);
    });
  });

  context("Header", () => {
    it("should display the brand logo", () => {
      cy.getByTestId("logo").should("exist");
      cy.getByTestId("logo").contains("mercado preso");
    });

    it("should display the search form", () => {
      cy.get("input[type='search']").should("exist");
    });

    it("should display the nav links", () => {
      cy.get('a[href*="/registration"]').should("exist");
      cy.get('a[href*="/login"]').should("exist");
      cy.get('a[href*="/purchases"]').should("exist");
      cy.get('a[href*="/cart"]').should("exist");
    });

    it("should navigate to the home page on click in the brand logo", () => {
      cy.getByTestId("logo").click();
      cy.location("pathname").should("match", /\/$/);
    });

    it("should navigate to the registration page on click in the registration link", () => {
      cy.get('a[href*="/registration"]').click();
      cy.location("pathname").should("match", /\/registration$/);
    });

    it("should navigate to the login page on click in the login link", () => {
      cy.get('a[href*="/login"]').click();
      cy.location("pathname").should("match", /\/login$/);
    });

    it("should navigate to the purchases page on click in the purchases link", () => {
      cy.get('a[href*="/purchases"]').click();
      cy.location("pathname").should("match", /\/purchases$/);
    });

    it("should navigate to the cart page on click in the cart link", () => {
      cy.get('a[href*="/cart"]').click();
      cy.location("pathname").should("match", /\/cart$/);
    });
  });

  context("Products List", () => {
    it("should display the products list", () => {
      cy.getByTestId("product-card").should("have.length", 25);
    });

    it("should navigate to the correct product page on click product card", () => {
      cy.getByTestId("product-card").first().click();
      cy.location("pathname").should(
        "match",
        /\/product\/cavus-deripio-beatae-comedo-approbo$/
      );
    });
  });
});
