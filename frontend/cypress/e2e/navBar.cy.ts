const baseURL = 'http://localhost:8080/#/'


describe('visit all pages via NavBar', () => {
  beforeEach(() => {
    cy.visit(baseURL)
})
it('passes', () => {
    cy.get('[data-cy="nav-link-home"]').should('contain', 'Accueil')
    cy.get('[data-cy="nav-link-products"]').should('contain', 'Produits')
    cy.get('[data-cy="nav-link-reviews"]').should('contain', 'Avis')
    cy.get('[data-cy="nav-link-home-logo"]').should('be.visible')
    cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion')
    cy.get('[data-cy="nav-link-register"]').should('contain', 'Inscription')
    cy.get('[data-cy="nav-link-cart"]').should('not.be.visible')
    cy.get('[data-cy="nav-link-logout"]').should('not.be.visible')
  })


})