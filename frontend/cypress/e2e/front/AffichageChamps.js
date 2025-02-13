const baseURL = 'http://localhost:8080/#'
const pageLogin = 'http://localhost:8080/#/login'

const login = () => {
  cy.visit(baseURL)
  cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
  cy.get('[data-cy="login-form"]').should('be.visible')
  cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
  cy.get('[data-cy="login-input-password"]').type("testtest")
  cy.get('[data-cy="login-submit"]').click()
}

//smoke test d'affichage champs connexion sur la page login
describe('affichage des boutons sur la page de login', () => {
  beforeEach(() => {
    cy.visit(baseURL)
  })

  it('sur la page de connexion je dois avoir accès aux inputs du formulaire de connexion', () => {
    cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
    cy.get('.content-login h1').should('be.visible').and('contain', 'Se connecter')
    cy.get('[data-cy="login-form"]').should('be.visible')
    cy.get('[data-cy="login-input-username"]').should('be.visible')
    cy.get('[data-cy="login-input-password"]').should('be.visible')
    cy.get('[data-cy="login-submit"]').should('be.visible').and('contain', 'Se connecter')
  })

  it('sans connexion les boutons panier et logout ne sont pas présents', () => {
    // sur la navbar je ne dois pas voir les liens déconnexion et Mon panier
    cy.get('[data-cy="nav-link-logout"]').should('not.exist')
    cy.get('[data-cy="nav-link-cart"]').should('contain', 'Mon panier').and('not.exist')
  })


  it('avec connexion les boutons panier et logout sont présents', () => {
    login()
    // après connexion, sur la navbar je dois voir Déconnexion et Mon panier
    cy.get('[data-cy="nav-link-logout"]').should('be.visible').and('contain', 'Déconnexion')
    cy.get('[data-cy="nav-link-cart"]').should('contain', 'Mon panier').should('be.visible')
  })

})

//smoke test présence du bouton ajout au panier quand je suis connectée
describe('affichage bouton ajout au panier dans une fiche produit', () => {


  it('sur une page produit si je suis connectée je vois et le bouton "Ajouter au panier"', () => {
    login()
    cy.visit(productURL + '/3')

    cy.get('[data-cy="detail-product-name"]').should('exist').and('not.be.empty')

    //je vérifie la présence du bouton ajouter au panier
    cy.get('data-cy="detail-product-add"').should('be.visible').and('contain', "Ajouter au panier")

  })


})

describe('affichage stock dans une fiche produit', () => {
  it('sur une page produit si je suis connectée je vois le stock du produit', () => {

    cy.visit(productURL + '/10')

    cy.get('[data-cy="detail-product-name"]').should('exist').and('not.be.empty')

    //je vérifie ma présence du stock de produit
    cy.get('[data-cy="detail-product-stock"]').should('be.visible').and('contain', 'en stock')

  })
})