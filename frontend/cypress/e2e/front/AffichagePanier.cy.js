const baseURL = 'http://localhost:8080/#'

const apiLogin = `${Cypress.env("apiUrl")}/login`;
const apiProduct = `${Cypress.env("apiUrl")}/products`;
const apiAdd = `${Cypress.env("apiUrl")}/orders/add`;
const apiOrder = `${Cypress.env("apiUrl")}/orders`;
let cat
let productId = 5

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
    cy.visit(baseURL)
  })

  it('connexion success, ajout produit, ajout et renvoi vers panier - cas passant', () => {
    cy.visit(baseURL)
    login()
    cy.get('[data-cy="nav-link-logout"]').should('be.visible')
    cy.get('[data-cy="nav-link-products"]').click()
    cy.get('[data-cy="product-link"]').first().click()
    //doit contenir au moins 1 produit en stock : passer par data-cy="detail-product-stock" ?


  })
})

//ce serait avec API, à corriger poru les tests d'interface
// describe('Test d\'ajout de produit au panier', () => {


//   it('doit permettre d\'ajouter un produit au panier et vérifier les limites', () => {
//     // Étape 1 : Connexion
//     login()

//     // Étape 2 : Vérification du produit
//     cy.request("GET", `${apiProduct}/${productId}`).then((response) => {
//       expect(response.status).to.eq(200);
//       expect(response.body).to.have.property('availableStock').and.be.gte(1);

//       // Étape 3 : Naviguer vers la page du produit
//       cy.visit(`/products/${productId}`);

//       // Étape 4 : Cliquer sur "Ajouter au panier"
//       cy.get('button.add-to-cart').click(); // Assure-toi que le sélecteur correspond

//       // Étape 5 : Vérification que le produit a été ajouté au panier
//       cy.request({
//         method: 'GET',
//         url: apiOrder,
//         headers: {
//           "Authorization": "Bearer " + authToken
//         }
//       }).then((response) => {
//         expect(response.status).to.eq(200);
//         const orderList = response.body.orderLines;
//         expect(orderList).to.be.an('array');
//         const produitExiste = orderList.some(item => item.product.id === productId);
//         expect(produitExiste).to.be.true; // Vérifie que le produit existe
//       });

//       // Étape 6 : Vérifier que le stock a été mis à jour
//       cy.request("GET", `${apiProduct}/${productId}`).then((response) => {
//         expect(response.status).to.eq(200);
//         const updatedStock = response.body.availableStock;
//         expect(updatedStock).to.eq(response.body.availableStock - 1); // Vérifie que le stock a diminué de 1
//       });

//       // Étape 7 : Tester les limites
//       // Essayer d'ajouter une quantité négative
//       cy.get('input.quantity').clear().type('-1'); // Assure-toi que le sélecteur correspond
//       cy.get('button.add-to-cart').click();
//       cy.get('.error-message').should('contain', 'Quantité invalide'); // Vérifie que le message d'erreur s'affiche

//       // Essayer d'ajouter une quantité supérieure à 20
//       cy.get('input.quantity').clear().type('25'); // Assure-toi que le sélecteur correspond
//       cy.get('button.add-to-cart').click();
//       cy.get('.error-message').should('contain', 'Quantité supérieure à la limite'); // Vérifie que le message d'erreur s'affiche
//     });
//   });
// });
