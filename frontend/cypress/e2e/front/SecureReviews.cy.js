const baseURL = 'http://localhost:8080/#'
const apiLogin = `${Cypress.env("apiUrl")}/login`

const login = () => {
    cy.visit(baseURL)
    cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
    cy.get('[data-cy="login-form"]').should('be.visible')
    cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
    cy.get('[data-cy="login-input-password"]').type("testtest")
   
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
        cy.get('[data-cy="review-input-rating-images"] img').first().click()
        cy.get('[data-cy="review-input-title"]').type('tester le commentaire')
        cy.get('[data-cy="review-input-comment"]').type('super !')
        cy.get('[data-cy="review-submit"]').click()
        //reload forcé et après, vérifier les emplacements
        cy.get('[data-cy="review-note"]').should('contain', 'tester le commentaire')
        cy.get('[data-cy="review-comment"]').each(($comment) => {
            expect($comment.text()).to.contain('super')
        })
            
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
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.get('[data-cy="nav-link-reviews"]').click()
        cy.get('[data-cy="review-input-rating-images"] img').first().click()
        cy.get('[data-cy="review-input-title"]').type('<a href="http://test.fr>Clic ici</a>')
        cy.get('[data-cy="review-input-comment"]').type('<a href="http://test.fr>Clic ici</a>')
        cy.get('[data-cy="review-submit"]').click()
        // vérifier que le commentaire n'affiche pas de lien clickable
        cy.get('[data-cy="review-comment"]').each(($comment) => {
            expect($comment.text()).to.not.contain('<a href')
        })
    
    })

    it('avis ne doit pas contenir de script de redirection qui s execute après le submit', () => {

        cy.visit(baseURL)
        login()
        cy.get('[data-cy="nav-link-reviews"]').click()
        FormDisplay()
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.visit(baseURL + '/reviews')
        cy.get('[data-cy="review-input-rating-images"] img').first().click()
        cy.get('[data-cy="review-input-title"]').type('test redirection via JS')
        cy.get('[data-cy="review-input-comment"]').type('<script type="text/javascript">window.location.replace("https://www.google.com/");</script>')
        cy.get('[data-cy="review-submit"]').click()
        //éviter que le script s exécute en vérifiant que la page après reload est toujours celle de review
        cy.url().should('eq', baseURL+'/reviews')
        //vérifier aussi que le script ne soit pas affiché
        cy.get('[data-cy="review-comment"]').each(($comment) => {
            expect($comment.text()).to.not.contain('<script>')
        })

    })


})

describe('si je ne suis pas connectée je ne peux pas poster un avis', () => {
    beforeEach(() => {
        cy.visit(baseURL)
    })
    it('je ne peux pas afficher le formulaire avis sans être connectée', () => {
        cy.get('[data-cy="nav-link-login"]').should('be.visible')
        cy.get('[data-cy="nav-link-reviews"]').click()
        cy.get('form').should('not.be.exist')

    })
})