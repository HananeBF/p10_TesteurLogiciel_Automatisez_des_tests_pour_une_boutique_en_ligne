const baseURL = 'http://localhost:8080/#/'
let productId
const apiProducts = `${Cypress.env("apiUrl")}/products/`


describe('product display frome homepage with descriptions and stock', () => {
  beforeEach(() => {
    cy.visit(baseURL)

  })

  it('doit afficher plusieurs produits dans la home avec image description prix stock et le bouton consulter', () => {
    cy.url().should('include', baseURL)
    cy.get('#other-products').should('have.length.greaterThan', 0)
    cy.get('.list-products').should('have.length', 3)
    // il fait vérifier le chargement de la page donc DOM load
    // les produits dans la home via l'id ?
    // et chaque article product-home , 
    // les images product-home-img, 
    // les titres product-home-name 
    // il devrait y avoir les description et non les ingredients mais je dois vérifier que 
    // prix product-home-price 
    // et consulter product-home-link
  
    // cy.get('#other-products').find('article') 
    //   //   cy.get('picture').should('be.visible')
    //   //   cy.get('name').should('be.visible')
    //   //   cy.get('description').should('be.visible')
    //   //   cy.get('price').should('be.visible')
    //   //   cy.get('availableStock').should('be.visible')

    

    // }

  })

})
describe('API Test - Product Details', () => {
  it('should return the product details', () => {
    const productId = 'ID_DU_PRODUIT'; // Remplace par l'ID du produit
    cy.request('GET', `http://localhost:8081/products/${productId}`)
      .then((response) => {
        expect(response.status).to.eq(200);
        // Ajoute des vérifications supplémentaires ici si nécessaire
      });
  });
});

