declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-testid attribute.
     * @example cy.getByTestId('testId')
     */
    getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
  }
}
