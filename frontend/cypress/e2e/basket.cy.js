const baseURL = 'http://localhost:8080/#'
const apiLogin = `${Cypress.env("apiUrl")}/login`
const apiOrder =`${Cypress.env("apiUrl")}/orders`
const apiBasket = `${Cypress.env("apiUrl")}/orders/add`


describe('consulter le panier en étant connecté', () => {
    beforeEach(() => {
        cy.visit(baseURL)
    })

    it('connexion success, ajout produit, ajout et renvoi vers panier - cas passant', () => {
        cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
        cy.get('[data-cy="login-form"]').should('be.visible')
        cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
        cy.get('[data-cy="login-input-password"]').type("testtest")
        cy.get('[data-cy="login-submit"]').submit()
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        //clic produit
        // ajouter produit
        // voir le panier

    
    })
  })

describe('consulter le panier sans etre connecté renvoie une erreur', () => {
    beforeEach(() => {
        cy.visit(baseURL+'/orders')
    })

    it('doit renvoyer une erreur quand je vais dans le panier si je ne suis pas connectée', () => {
        cy.visit(baseURL+'/products/3')
        cy.get('[data-cy="detail-product-add"]').click()
        cy.request({
            method: 'GET',
            url: apiBasket,
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.not.eq(200);
          })
        

    })
    
})

describe('API Test - Confidential Data', () => {
    it('should return 401 or 403 when accessing orders without authentication', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/orders',
        failOnStatusCode: false
      }).then((response) => {
        expect([401, 403]).to.include(response.status);
      });
    });
  });

  // ajout au panier impossible car out of stock
  describe('API Test - Add Out of Stock Product to Cart', () => {
    it('should return an error when adding an out of stock product', () => {
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/orders/add',
        body: {
          productId: 'ID_DU_PRODUIT_EN_RUPTURE_DE_STOCK'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.not.eq(200);
       
      });
    });
  });