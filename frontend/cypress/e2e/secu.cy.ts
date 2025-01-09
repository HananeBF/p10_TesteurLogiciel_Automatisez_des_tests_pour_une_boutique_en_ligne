const baseURL = 'http://localhost:8080/#'

describe('test sécu revews page', () => {
    
    it('avis ne doit pas contenir de lien', () => {
        cy.visit(baseURL)
        cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
        cy.get('[data-cy="login-form"]').should('be.visible')
        cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
        cy.get('[data-cy="login-input-password"]').type("testtest")
        cy.get('[data-cy="login-submit"]').should('contain', 'Se connecter').click()
        cy.get('[data-cy="nav-link-reviews"]').click()
        cy.get('[data-cy="review-input-rating"]').click()
        cy.get('[data-cy="review-input-title"]').type('<a href="http://test.fr>Clic ici</a>')
        cy.get('[data-cy="review-input-comment"]').type('<a href="http://test.fr>Clic ici</a>')
        cy.get('[data-cy="submit-comment"]').click()
        cy.get('[data-cy="comment-section"]').should('not.contain', '<a href="http://test.fr>Clic ici</a>')

    })
})