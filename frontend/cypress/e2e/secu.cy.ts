/* scénario d'exeplme
En tant que client sur le site EcoBliss

Lorsque je clic sur avis
Alors
si je ne suis pas connectée
je dois cliquer sur Connexion
puis entrer mon login
puis entrer mon mdp
puis cliquer sur se connecter
ATTENDRE le load vers la page d'accueil
puis cliquer sur avis
puis cliquer sur trois étoiles
puis écrire dans l'input title
puis écrire dans l'input comment
puis soumettre l'avis
puis vérifier que le message est bien présent
puis vérifier qu'il n'y a pas de lien dan le title ou dans le commentaire 
*/ 

const baseURL = 'http://localhost:8080/#'

describe('test ajout avis sur la page review', () => {
    it('il faut être connecté pour poster un avis', () => { 
    cy.visit(baseURL)
    cy.get('[data-cy="nav-link-reviews"]').click()
    cy.get('body').then(($body) => { 
        if ($body.find('[data-cy="review-form"]').length > 0) { 
        // Si le formulaire  est absent, c'est que l'utilisateur n'est pas connecté :  il faudra donc se connecter
        cy.get('[data-cy="nav-link-login"]').click()
        cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
        cy.get('[data-cy="login-input-password"]').type("testtest")
        cy.get('[data-cy="login-submit"]').should('contain', 'Se connecter').click()
        //il faut attendre que la page home s'affiche complètement apparemment : je peux chercher à avoir de visible la navbar Deconnexion par exemple pour être sûre d'être connectée
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
       
        }
        
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.visit(baseURL+'/reviews')
        cy.get('[data-cy="review-input-rating"]').click()
        cy.get('[data-cy="review-input-title"]').type('tester le commentaire')
        cy.get('[data-cy="review-input-comment"]').type('super !')
        cy.get('[data-cy="submit-comment"]').click()
        cy.get('[data-cy="review-note"]').should('contain', 'tester le commentaire')
        cy.get('[data-cy="review-comment"]').should('contain','super !')
        cy.get('[data-cy="review-comment"]').should('not.contain', '<a href=')
    
    })
})  


})

describe('test sécu reviews page', () => {
    
    it('avis ne doit pas contenir de lien', () => {
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
            // cy.url().should('include', baseURL) <- ce n'est pas le bon mais je peux chercher à avoir de visible la navbar Deconnexion par exemple
            }
        
        cy.visit(baseURL)
        cy.get('body').should('be.visible')
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.visit(baseURL+'/reviews')
        cy.get('[data-cy="review-input-rating"]').eq(3)
        cy.get('[data-cy="review-input-title"]').type('<a href="http://test.fr>Clic ici</a>')
        cy.get('[data-cy="review-input-comment"]').type('<a href="http://test.fr>Clic ici</a>')
        cy.get('[data-cy="submit-comment"]').click()
        cy.get('[data-cy="review-comment"]').should('not.contain', '<a href="http://test.fr>Clic ici</a>')

    })
})