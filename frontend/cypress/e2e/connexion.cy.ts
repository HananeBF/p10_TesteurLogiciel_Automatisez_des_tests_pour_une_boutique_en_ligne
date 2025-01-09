/*
CA01
 En tant que client sur la page d'accueil du site EcoBlass
lorsque je clique sur la page de connexion (baseURL+'/login')
que la page retourne une 200 et s'affiche
que le formulaire s'affiche
que je trouve input l'email : data-cy="login-input-username"
que je saisie "test2@test.fr" dans l'input
que je trouve input MDP : data-cy="login-input-password"
que je saisie “testtest” dans l'input
que je trouve le bouton de connexion : data-cy="login-submit"
que je clique sur ce bouton

Alors, je suis connectée et je vois le bouton Mon panier
et le bouton Connexion devient Déconnexion
ok passe

non passant : formulaire ne charge pas correctement manque input MDP


non passant : formulaire ne charge pas correctement manque bouton de soumission


non passant : pas d'affichage page panier 
En tant que client sur la page d'accueil du site EcoBlass
lorsque je clique sur la page de connexion (baseURL+'/login')
que la page retourne une 200 et s'affiche
que le formulaire s'affiche 
que je trouve input l'email : data-cy="login-input-username"
que je saisie un email "test2@test.fr" dans l'input
que je trouve input MDP : data-cy="login-input-password"
que je saisie un mdp  “testtest” dans l'input
que je trouve le bouton de connexion : data-cy="login-submit"
que je clique sur ce bouton
mais que la connexion au serveur est impossible
Alors, j'ai un page d'erreur (exemple 5xx)


  })
  
*/

const baseURL = 'http://localhost:8080/#'




describe('Connexion avec email et mot de passe correct depuis la page Accueil puis affichage bouton Mon panier et Déconnexion', () => {
  beforeEach(() => {
    cy.visit(baseURL)
  })

  it('connexion ok avec bon email et mdp', () => {
    cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
    cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
    cy.get('[data-cy="login-input-password"]').type("testtest")
    cy.get('[data-cy="login-submit"]').should('contain', 'Se connecter').click()
    cy.get('[data-cy="nav-link-cart"]').should('contain', 'Mon panier')
    cy.get('[data-cy="nav-link-logout"]').should('contain', 'Déconnexion')
  })


})

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

  //   it('devrait échouer si target submit invalid', () => {
  //     cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()   
  //     cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
  //     //if valid, pass, sinon, fail
  //     cy.get('[data-cy="login-input-password"]').type("testtest")
  //     cy.get('[data-cy="login-submit"]').should('contain', 'Se connecter').click()
  //     cy.get('[data-cy="nav-link-cart"]').should('contain', 'Mon panier')
  //     cy.get('[data-cy="nav-link-logout"]').should('contain', 'Déconnexion')
  //   })
  // })

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
  })