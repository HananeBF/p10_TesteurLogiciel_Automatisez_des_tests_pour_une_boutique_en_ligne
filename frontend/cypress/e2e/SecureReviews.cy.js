const baseURL = 'http://localhost:8080/#'
const apiLogin = `${Cypress.env("apiUrl")}/login`

const login = () => {
    cy.visit(baseURL)
    cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
    cy.get('[data-cy="login-form"]').should('be.visible')
    cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
    cy.get('[data-cy="login-input-password"]').type("testtest")
   // cy.intercept('POST', apiLogin).as('Connect')
    cy.get('[data-cy="login-submit"]').click()
    //cy.wait('@Connect').its('response.statusCode').to.eq(200)
}
const FormDisplay = () => {
    cy.get('body').then(($body) => {
        if ($body.find('[data-cy="login-form"]').length > 0) {
            cy.get('[data-cy="review-form"]').should('be.visible')
        } else {
            cy.log('Le formulaire n\'est pas affiché car l\'utilisateur n\'est pas connecté.')
        }
    })
}

describe('test ajout avis sur la page review', () => {
    it('il faut être connecté pour poster un avis', () => {
        cy.visit(baseURL)
        login()
        cy.get('[data-cy="nav-link-reviews"]').click()
        FormDisplay()
        cy.get('body').should('be.visible')
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.get('[data-cy="review-input-rating"]').first().click()
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
    })

    it('avis ne doit pas contenir de lien', () => {
    
        login()
        cy.get('[data-cy="nav-link-reviews"]').click()
        FormDisplay()
        cy.get('body').should('be.visible')
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.get('[data-cy="review-input-rating"]').eq(3)
        cy.get('[data-cy="review-input-title"]').type('<a href="http://test.fr>Clic ici</a>')
        cy.get('[data-cy="review-input-comment"]').type('<a href="http://test.fr>Clic ici</a>')
        cy.get('[data-cy="submit-comment"]').click()
        cy.get('[data-cy="review-comment"]').should('not.contain', '<a href=')
        cy.get('[data-cy="review-title"]').should('not.contain', '<a href=')

    })

    it('avis ne doit pas contenir de script', () => {

        cy.visit(baseURL)
        login()
        cy.get('[data-cy="nav-link-reviews"]').click()
        FormDisplay()
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
        login()
        cy.get('[data-cy="nav-link-reviews"]').click()
        FormDisplay()
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
        login()
        cy.get('[data-cy="nav-link-reviews"]').click()
        FormDisplay()
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
        cy.get('form').should('not.be.exist')

    })
})

// test à faire "drop table Utilisateurs" et autres injections requetes sql exemple Dupont';-- (login) pi ' or 1 -- pour le mdp