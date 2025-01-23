const baseURL = 'http://localhost:8080/#'
const apiLogin = `${Cypress.env("apiUrl")}/login`



describe('Connexion avec email et mot de passe correct depuis la page Accueil puis affichage bouton Mon panier et Déconnexion', () => {
  beforeEach(() => {
    cy.visit(baseURL)
  })

  it('connexion ok avec bon email et mdp', () => {
    cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
    cy.get('[data-cy="login-form"]').should('be.visible')
    cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
    cy.get('[data-cy="login-input-password"]').type("testtest")
    cy.get('[data-cy="login-submit"]').click().then((response) => {
      expect(response.status).to.eq(200)
      // .then(
      //   cy.wait('@login').its('response.statusCode').should('eq', 200)
      //   .then (
      //  cy.get('.loading').should('not.exist')
      //   )
      //   .then (
      //    cy.get('[data-cy="nav-link-logout"]').should('be.visible')
      //    )  
      //   .then(cy.get('[data-cy="nav-link-cart"]').should('contain', 'Mon panier').should('be.visible'))
      //   .then(cy.get('[data-cy="nav-link-logout"]').should('contain', 'Déconnexion').should('be.visible'))
      //   .then(cy.get('[data-cy="nav-link-login"]').should('not.be.visible'))
      //   .then(cy.get('[data-cy="nav-link-register"]').should('not.be.visible'))
    })



    //  //request 200 for login must be intercept and wait for it
    //   
        
  })
})




    //il faut attendre que la page home s'affiche complètement apparemment : je peux chercher à avoir de visible la navbar Deconnexion par exemple pour être sûre d'être connectée


//   })


// })

describe('Tests de connexion échouée', () => {
  beforeEach(() => {
    cy.visit(baseURL)
  })
  it('devrait échouer avec un mauvais login et mdp', () => {
    cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
    cy.get('[data-cy="login-input-username"]').type('a@b.co')
    cy.get('[data-cy="login-input-password"]').type('MPD')
    cy.get('[data-cy="login-submit"]').click()

    //submit doit indiquer une erreur
    cy.get('[data-cy="login-errors"]').should('be.visible').and('contain', 'Identifiants incorrects')
  })

  it('erreur car mauvais mot de passe', () => {

    cy.get('[data-cy="nav-link-login"]').click()
    cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
    cy.get('[data-cy="login-input-password"]').type('MDP');
    cy.get('[data-cy="login-submit"]').should('contain', 'Se connecter').click()
    //submit doit indiquer une erreur
    cy.get('[data-cy="login-errors"]').should('be.visible').and('contain', 'Identifiants incorrects')
  })

  it('erreur car mauvais login', () => {

    cy.get('[data-cy="nav-link-login"]').click()
    cy.get('[data-cy="login-input-username"]').type("a@b.co")
    cy.get('[data-cy="login-input-password"]').type('testtest');
    cy.get('[data-cy="login-submit"]').should('contain', 'Se connecter').click()

    //submit doit indiquer une erreur
    cy.get('[data-cy="login-errors"]').should('be.visible').and('contain', 'Identifiants incorrects')
  })

  it('devrait échouer avec des champs vides', () => {

    cy.get('[data-cy="nav-link-login"]').click()
    cy.get('[data-cy="login-submit"]').should('contain', 'Se connecter').click()
    cy.get('[data-cy="login-input-username"]').should('have.class', 'ng-invalid')
    cy.get('[data-cy="login-input-password"]').should('have.class', 'ng-invalid')
    //submit doit indiquer une erreur différente et les label des inputs doivent être en invalid
    cy.get('[data-cy="login-errors"]').should('be.visible').and('contain', 'Merci de remplir correctement tous les champs')
  })


})

describe('chargement de page ou de ses composants échoués', () => {
  beforeEach(() => {
    cy.visit(baseURL)
  })
  it('échec car page non visible', () => {
    cy.get('[data-cy="nav-link-login"]').click()
    cy.get('body').should('not.contain', 'Se connecter')
  })

  it('échec car formulaire absent', () => {
    cy.get('[data-cy="nav-link-login"]').click()
    cy.get('[data-cy="login-form"]').should('not.be.visible')
  })

  it('échec car formulaire incomplet manque input Email', () => {
    cy.get('[data-cy="nav-link-login"]').click()
    cy.get('[data-cy="login-input-username"]').should('not.be.visible')
  })

  it('échec car formulaire incomplet manque input password', () => {
    cy.get('[data-cy="nav-link-login"]').click()
    cy.get('[data-cy="login-input-password"]').should('not.be.visible')
  })

  it('échec car formulaire incomplet manque bouton Se connecter', () => {
    cy.get('[data-cy="nav-link-login"]').click()
    cy.get('[data-cy="login-submit"]').should('not.be.visible')
  })

  it('devrait échouer si target submit invalid', () => {
    cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
    cy.get('[data-cy="login-input-username"]').type("test2@test.fr")

    cy.get('[data-cy="login-input-password"]').type("testtest")
    cy.get('[data-cy="login-submit"]').should('contain', 'Se connecter').click()
    cy.get('[data-cy="nav-link-cart"]').should('not.be.visible')
    cy.get('[data-cy="nav-link-logout"]').should('be.visible')
  })
})