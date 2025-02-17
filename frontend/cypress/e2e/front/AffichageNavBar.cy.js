const baseURL = 'http://localhost:8080/#/'
const login = () => {
  cy.visit(baseURL)
  cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
  cy.get('[data-cy="login-form"]').should('be.visible')
  cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
  cy.get('[data-cy="login-input-password"]').type("testtest")

  cy.get('[data-cy="login-submit"]').click()
  
}

//ajouter le même test avec mobile ?
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
    cy.get('[data-cy="nav-link-cart"]').should('not.exist')
    cy.get('[data-cy="nav-link-logout"]').should('not.exist')
  })
  it('en cas de connexion, je vois panier et deconnexion', () => {
    login()
    cy.visit(baseURL)
    cy.get('[data-cy="nav-link-cart"]').should('to.be.visible')
    cy.get('[data-cy="nav-link-logout"]').should('to.be.visible')
    cy.get('[data-cy="nav-link-login"]').should('not.exist')
    cy.get('[data-cy="nav-link-register"]').should('not.exist')
  })
})