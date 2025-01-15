describe('consulter le panier en étant connecté', () => {
    beforeEach(() => {
        cy.visit(baseURL)
    })

    it('connexion ok accès produit et panier cas passant', () => {
        cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
        cy.get('[data-cy="login-form"]').should('be.visible')
        cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
        cy.get('[data-cy="login-input-password"]').type("testtest")
        cy.get('[data-cy="login-submit"]').submit()
        //request 200 for login must be intercept and wait for it
        cy.wait('@login').its('response.statusCode').should('eq', 200)
        cy.get('.loading').should('not.exist')
        //il faut attendre que la page home s'affiche complètement apparemment : je peux chercher à avoir de visible la navbar Deconnexion par exemple pour être sûre d'être connectée
        cy.url().should('include', baseURL + '/')
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        

    })