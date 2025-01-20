const baseURL = 'http://localhost:8080/#/'
let productId
const apiProducts = `${Cypress.env("apiUrl")}/products/`


describe('product display frome hmepage with descriptions and stock', () => {
  beforeEach(() => {
    cy.visit(baseURL)
    cy.intercept('GET', 'http://localhost:8081/products').as('products')

  })

  it('doit afficher plusieurs produits dans la home avec image description prix stock et le bouton consulter', () => {
    cy.url().should('include', baseURL)
    cy.get('#other-products').should('have.length.greaterThan', 0)
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


