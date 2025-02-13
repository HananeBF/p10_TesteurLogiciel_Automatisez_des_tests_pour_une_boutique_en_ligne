const baseURL = 'http://localhost:8080/#'
const productURL = 'http://localhost:8080/#/products'

const apiLogin = `${Cypress.env("apiUrl")}/login`;
const apiProduct = `${Cypress.env("apiUrl")}/products`;
const apiAdd = `${Cypress.env("apiUrl")}/orders/add`;
const apiOrder = `${Cypress.env("apiUrl")}/orders`;
let cat
let productId
let stockInitial
let quantity
let nameProduct
let stockUpdate


const login = () => {
  cy.visit(baseURL)
  cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion').click()
  cy.get('[data-cy="login-form"]').should('be.visible')
  cy.get('[data-cy="login-input-username"]').type("test2@test.fr")
  cy.get('[data-cy="login-input-password"]').type("testtest")
  cy.get('[data-cy="login-submit"]').click()
}


describe('consulter le panier en étant connecté', () => {
  beforeEach(() => {
    login()
  })

  it('connexion success, ajout produit, ajout et renvoi vers panier - cas passant', () => {
    cy.get('[data-cy="nav-link-logout"]').should('be.visible')
    cy.visit(productURL + '/5')
    //cy.reload()
    cy.get('[data-cy="detail-product-name"]').should('exist').and('not.be.empty')



    //je vérifie que le stock initial est supérieur à 1
    cy.get('[data-cy="detail-product-stock"]').then(($stockInitial) => {

      stockInitial = parseInt($stockInitial.text())
      console.log(stockInitial)
      expect(stockInitial).to.be.greaterThan(1)



      cy.get('[data-cy="detail-product-name"]').then(($name) => {
        
        nameProduct = $name.text()
        console.log(nameProduct)
        //cliquer sur ajouter au panier
        cy.get('[data-cy="detail-product-add"]').click()

        //aller dans le panier
        cy.get('[data-cy="nav-link-cart"]').click()

        //vérifier que le produit existe
        cy.get('#cart-content').each(($line) => {
          // Pour chaque ligne, vérifiez le nom du produit
          cy.wrap($line).find('[data-cy="cart-line"] .product-name [data-cy="cart-line-name"]').then(($productName) => {
            // Vérifiez si le texte contient "Poussière de lune" ou nameProduct variable stockée plus haut
              cy.wrap($productName).should('be.visible').and('contain', nameProduct)
              console.log($productName)
            })

            // cy.get('#cart-content [data-cy="cart-line"]').each((productPanier) => {
            //   console.log(productPanier[0])
            //    cy.wrap(productPanier[0]).within(() => {
            //      cy.get('[data-cy="cart-line-name"] h3').should('contain', nameProduct)
            //    })
            //   //('[data-cy="cart-line-name"]').should('contain', nameProduct)
            // })

            //retourner à la fiche produit 5
            cy.go('back')
            cy.reload()

            //le stock initial a dû être diminué de 1 car je n'ai pas touché à quantité   
            cy.get('[data-cy="detail-product-stock"]').then(($stockUpdate) => {
              stockUpdate = parseInt($stockUpdate.text())
              console.log(stockUpdate)
              expect(stockUpdate).to.equal(stockInitial - 1)
            })

          })
        })

      })
    })
  })

// Vérifiez le contenu du panier via l'API : déjà vérifié dans test apiOrder : cas de test ajout d'un produit, stocker son productId et vérifier qu'il existe dans le panier via cette variable

    describe('être connecté et valider les quantités limites du produit ', () => {
      beforeEach(() => {
        login()
        cy.visit(baseURL)
        cy.get('[data-cy="nav-link-logout"]').should('be.visible')
        cy.reload()
        cy.visit(productURL + '/5')
      })

      it('doit vérifier les limites d\'entrée pour la quantité', () => {


        cy.visit(productURL + '/5')
        //vérifier la quantité envoyée de -1
        cy.get('[data-cy="detail-product-quantity"]').clear().type(-1)
        console.log()
        cy.get('.error').should('contain', 'Quantité invalide')

        // Entrez un chiffre supérieur à 20
        cy.get('[data-cy="detail-product-quantity"]').clear().type(21)
        console.log()
        cy.get('.error').should('contain', 'Quantité invalide')
      })
    })


