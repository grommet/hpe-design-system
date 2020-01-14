/* eslint-disable no-undef */
// / <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("cy.go() - go back or forward in the browser's history", () => {
    // https://on.cypress.io/go

    cy.get('.enqPpC > .fECWsg').click();
    cy.location('pathname').should('be', '/guidelines');

    cy.go('back');
    cy.location('pathname').should('be', '/');

    cy.go('forward');
    cy.location('pathname').should('be', '/guidelines');

    // clicking back
    cy.go(-1);
    cy.location('pathname').should('be', '/');

    // clicking forward
    cy.go(1);
    cy.location('pathname').should('be', '/guidelines');
  });

  it('allows user to type in search bar and click to navigate', () => {
    cy.get('.FvsMj').type('Branding');
    cy.get('li > .StyledButton-sc-323bzc-0 > .StyledBox-sc-13pk1d4-0').click();
    cy.location('pathname').should('be', '/foundation/branding');
  });

  it('allows user to type in search bar and use keyboard to navigate', () => {
    cy.get('body')
      .tab()
      .tab()
      .type('Color')
      .type('{downarrow}')
      .type('{enter}');

    cy.location('pathname').should('be', '/foundation/color');
  });
});
