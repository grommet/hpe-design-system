/* eslint-disable no-undef */
// / <reference types="Cypress" />

context('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('contains the right number of nav elements', () => {
    // make header subject
    cy.get('.kKsnZj')
      .children()
      .should('have.length', 2);

    // make nav subject
    cy.get('.kKsnZj > :nth-child(2)')
      .children()
      .should('have.length', 5);
  });

  it("cy.go() - go back or forward in the browser's history", () => {
    // https://on.cypress.io/go

    // Make header subject
    cy.get('.kKsnZj')
      .contains('Foundation')
      .click();

    cy.location('pathname').should('include', 'foundation');

    cy.go('back');
    cy.location('pathname').should('not.include', 'foundation');

    cy.go('forward');
    cy.location('pathname').should('include', 'foundation');

    // clicking back
    cy.go(-1);
    cy.location('pathname').should('not.include', 'foundation');

    // clicking forward
    cy.go(1);
    cy.location('pathname').should('include', 'foundation');
  });

  it('cy.reload() - reload the page', () => {
    // https://on.cypress.io/reload
    cy.reload();

    // reload the page without using the cache
    cy.reload(true);
  });
});
