const baseURL = 'http://localhost:8080/#'

const login = () => {
  cy.visit(baseURL)
  cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
  cy.get('[data-cy="login-form"]').should('be.visible')
  cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
  cy.get('[data-cy="login-input-password"]').type("testtest")
 
  cy.get('[data-cy="login-submit"]').click()
  //cy.wait('@Connect').its('response.statusCode').to.eq(200)
}


describe('consulter le panier en étant connecté', () => {
    beforeEach(() => {
        cy.visit(baseURL)
    })

    it('connexion success, ajout produit, ajout et renvoi vers panier - cas passant', () => {
        cy.visit(baseURL)
        login()
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.get('[data-cy="nav-link-products"]').click()
        cy.get('[data-cy="product-link"]').first().click()
        //doit contenir au moins 1 produit en stock : passer par data-cy="detail-product-stock" ?

    
    })
  })


