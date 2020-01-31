/* eslint-disable no-undef */
// / <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it("cy.go() - go back or forward in the browser's history", () => {
    // https://on.cypress.io/go

    cy.get('[data-cy="tile"]')
      .contains('Foundation')
      .click();

    cy.location('pathname').should('eq', '/foundation');

    cy.go('back');
    cy.location('pathname').should('eq', '/');

    cy.go('forward');
    cy.location('pathname').should('eq', '/foundation');

    // clicking back
    cy.go(-1);
    cy.location('pathname').should('eq', '/');

    // clicking forward
    cy.go(1);
    cy.location('pathname').should('eq', '/foundation');
  });

  it('allows user to type in search bar and click to navigate', () => {
    cy.get('[data-cy="search"]').type('Col');
    cy.get('[data-cy="suggestion"]')
      .contains('Color Palettes')
      .click();
    cy.location('pathname').should('eq', '/foundation/color');
    cy.hash().should('eq', '#color-palettes');
  });

  it('allows user to type in search bar and use keyboard to navigate', () => {
    cy.get('body')
      .tab()
      .tab()
      .tab()
      .type('Col')
      .type('{downarrow}')
      .type('{downarrow}')
      .type('{enter}');

    cy.location('pathname').should('eq', '/foundation/color');
    cy.hash().should('eq', '#brand-color');
  });

  it('opens search suggestions on focus', () => {
    // with click
    cy.get('[data-cy="search"]').click();
    cy.get('[data-cy="suggestion"]').should('be.visible');

    cy.reload();

    // with keyboard
    cy.get('body')
      .tab() // theme mode toggle
      .tab() // appidentity
      .tab(); // search input
    cy.get('[data-cy="suggestion"]').should('be.visible');
  });
});
