const baseURL = 'http://localhost:8080/#'

describe('test ajout avis sur la page review', () => {
    beforeEach(() => {
        cy.intercept('POST', 'http://localhost:8081/login').as('login')
    })

    it('il faut être connecté pour poster un avis', () => {
        
        cy.visit(baseURL)
        cy.get('[data-cy="nav-link-reviews"]').click()
        cy.get('body').then(($body) => {
            if ($body.find('[data-cy="review-form"]').length > 0) {
                // Si le formulaire  est absent, c'est que l'utilisateur n'est pas connecté :  il faudra donc se connecter
                
                cy.get('[data-cy="nav-link-login"]').click()
                cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
                cy.get('[data-cy="login-input-password"]').type("testtest")
                cy.get('[data-cy="login-submit"]').submit()
                //request 200 for login must be intercept and wait for it
                cy.wait('@login').its('response.statusCode').should('eq', 200)
                
                cy.get('.loading').should('not.exist')
                //il faut attendre que la page home s'affiche complètement apparemment : je peux chercher à avoir de visible la navbar Deconnexion par exemple pour être sûre d'être connectée
                cy.url().should('include', baseURL + '/')
                cy.get('[data-cy="nav-link-logout"]').should('be.visible')

            }
        })
    })
    it('je peux rédiger mon avis', () => {
            cy.get('[data-cy="nav-link-logout"]').should('be.visible')
            cy.visit(baseURL + '/reviews')
            cy.get('[data-cy="review-input-rating"]').click()
            cy.get('[data-cy="review-input-title"]').type('tester le commentaire')
            cy.get('[data-cy="review-input-comment"]').type('super !')
            cy.get('[data-cy="submit-comment"]').submit()
            cy.get('[data-cy="review-note"]').should('contain', 'tester le commentaire')
            cy.get('[data-cy="review-comment"]').should('contain', 'super !')
            cy.get('[data-cy="review-comment"]').should('not.contain', '<a href=')
    })


})

describe('test sécu reviews page commentaire ou titre invalide', () => {
    beforeEach(() => {
        cy.visit(baseURL)
        cy.get('[data-cy="nav-link-reviews"]').should('contain', 'Avis').click()
        if ($body.find('[data-cy="review-form"]').length > 0) {
            // Si le formulaire  est absent, c'est que l'utilisateur n'est pas connecté :  il faudra donc se connecter
            cy.get('[data-cy="nav-link-login"]').click()
            cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
            cy.get('[data-cy="login-input-password"]').type("testtest")
            cy.get('[data-cy="login-submit"]').should('contain', 'Se connecter').click()
            //il faut attendre que la page home s'affiche complètement apparemment
            cy.get('[data-cy="nav-link-logout"]').should('be.visible')
            cy.intercept('POST', 'http://localhost:8081/login').as('login')
        }
    })

    it('avis ne doit pas contenir de lien', () => {
        cy.visit(baseURL)
        cy.get('body').should('be.visible')
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.visit(baseURL + '/reviews')
        cy.get('[data-cy="review-input-rating"]').eq(3)
        cy.get('[data-cy="review-input-title"]').type('<a href="http://test.fr>Clic ici</a>')
        cy.get('[data-cy="review-input-comment"]').type('<a href="http://test.fr>Clic ici</a>')
        cy.get('[data-cy="submit-comment"]').click()
        cy.get('[data-cy="review-comment"]').should('not.contain', '<a href=')
        cy.get('[data-cy="review-title"]').should('not.contain', '<a href=')

    })

    it('avis ne doit pas contenir de script', () => {

        cy.visit(baseURL)
        cy.get('body').should('be.visible')
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.visit(baseURL + '/reviews')
        cy.get('[data-cy="review-input-rating"]').eq(3)
        cy.get('[data-cy="review-input-title"]').type('test redirection via JS')
        cy.get('[data-cy="review-input-comment"]').type('<script type="text/javascript"><!--window.location.replace("https://www.google.com/")--></script>')
        cy.get('[data-cy="submit-comment"]').click()
        cy.get('[data-cy="review-comment"]').should('not.contain', '<script>')
        cy.get('[data-cy="review-title"]').should('not.contain', '<script>')

    })
    it('avis ne doit pas contenir de chevron ouvrant', () => {

        cy.visit(baseURL)
        cy.get('body').should('be.visible')
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.visit(baseURL + '/reviews')
        cy.get('[data-cy="review-input-rating"]').eq(3)
        cy.get('[data-cy="review-input-title"]').type('Testons aussi les chevrons')
        cy.get('[data-cy="review-input-comment"]').type('<')
        cy.get('[data-cy="submit-comment"]').click()
        cy.get('[data-cy="review-comment"]').should('not.contain', '<')
        cy.get('[data-cy="review-title"]').should('not.contain', '<')

    })
    it('avis ne doit pas contenir de chevron fermant', () => {

        cy.visit(baseURL)
        cy.get('body').should('be.visible')
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.visit(baseURL + '/reviews')
        cy.get('[data-cy="review-input-rating"]').eq(3)
        cy.get('[data-cy="review-input-title"]').type('Testons aussi les chevrons')
        cy.get('[data-cy="review-input-comment"]').type('>')
        cy.get('[data-cy="submit-comment"]').click()
        cy.get('[data-cy="review-comment"]').should('not.contain', '>')
        cy.get('[data-cy="review-title"]').should('not.contain', '>')

    })
})

describe('si je ne suis pas connectée je ne peux pas poster un avis', () => {
    beforeEach(() => {
        cy.visit(baseURL)
    })
    it('je ne peux pas afficher le formulaire avis sans être connectée', () => {
        cy.get('body').should('be.visible')
        cy.get('[data-cy="nav-link-login"]').should('be.visible')
        
        cy.visit(baseURL + '/reviews')
        cy.get('form').should('not.be.visible')
        // cy.get('[data-cy="review-input-rating"]').should('not.be.visible')
        // cy.get('[data-cy="review-input-title"]').should('not.be.visible')
        // cy.get('[data-cy="review-input-comment"]').should('not.be.visible')
        // cy.get('[data-cy="submit-comment"]').should('not.be.visible')
        
    })
})