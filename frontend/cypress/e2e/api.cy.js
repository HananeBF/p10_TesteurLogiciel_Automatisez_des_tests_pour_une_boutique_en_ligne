const apiProduct = `${Cypress.env("apiUrl")}/products`

context("GET /products", () => {
    it("avoir une liste de produits", () => {
        cy.request("GET", apiProduct).then((response) => {
            console.log(response.body)
            expect(response.status).to.eq(200)
            expect(response.body).length.to.be.greaterThan(7)
            
            
        })
    })
   
})

describe('je ne devrais pas accéder au panier si je ne suis pas authentifiée', () => {
    it('test API doit retourner une 401 car non authentifié', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/orders',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
      })
    })

    it('test API doit retourner une 403 car pas les droits', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:8081/orders',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(403)
      })
    })
  })

  
  describe('API Test - Orders List', () => {
    it('should return the list of products in the cart', () => {
      cy.request('GET', 'http://localhost:8081/orders')
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).toBeGreaterThan(1)
        })
    })
  })
  

  
  

  
  
    
  

  describe('API Test - Add Product to Cart', () => {
    it('should add a product to the cart', () => {
      cy.request('POST', 'http://localhost:8081/orders/add', {
        productId: 'ID_DU_PRODUIT_DISPONIBLE'
      }).then((response) => {
        expect(response.status).to.eq(200);
        // Ajoute des vérifications supplémentaires ici si nécessaire
      });
    });
  });
  

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

  describe('API Test - Add Review', () => {
    it('should add a review', () => {
      cy.request('POST', 'http://localhost:8081/reviews', {
        productId: '3',
        review: 'vérification'
      }).then((response) => {
        expect(response.status).to.eq(200);
        
      });
    });
  });
  
  