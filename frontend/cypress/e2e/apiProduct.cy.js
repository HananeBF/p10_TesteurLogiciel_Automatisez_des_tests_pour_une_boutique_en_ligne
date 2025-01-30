const baseURL = 'http://localhost:8080/#/'
let productId
const apiProducts = `${Cypress.env("apiUrl")}/products`


describe('recupérer des prodruits via api with descriptions and stock', () => {

   
    it('doit récupérer tous les produits de la base et extraire les id', () => {
        cy.request("GET", apiProducts).then((response) => {
           
            expect(response.status).to.eq(200)
            expect(response.body).length.to.be.greaterThan(5)
            productId = response.body[Math.floor(Math.random() * response.body.length)].id
            const allRequestResponses = response.allRequestResponses
            expect(allRequestResponses).to.be.an('array')
            
        })
    })

    it("Récupérer les détails d'un produit par id", () => {
        // Vérifiez que l'ID de catégorie a été extrait avec succès
        cy.request("GET", apiProducts + '/9').then((response) => {
            expect(productId).to.be.a("number")
            expect(response.status).to.eq(200)
            const responseBody = response.body
            expect(responseBody).to.have.property('aromas')
            expect(responseBody).to.have.property('availableStock')
            expect(responseBody).to.have.property('description')
            expect(responseBody).to.have.property('id')
            expect(responseBody).to.have.property('ingredients')
            expect(responseBody).to.have.property('name')
            expect(responseBody).to.have.property('picture')
            expect(responseBody).to.have.property('price');
            expect(responseBody).to.have.property('skin')
            expect(responseBody).to.have.property('varieties')
            const allRequestResponses = response.allRequestResponses;
            expect(allRequestResponses).to.be.an('array')
            expect(allRequestResponses.length).to.be.gte(1)
        })

    })
// ci-dessous test affichage, pas api
    // it('doit afficher 3 produits randoms dans la home avec image description prix stock et le bouton consulter', () => {
    //     cy.request("GET", apiProductsHome).then((response) => {

    //         expect(response.status).to.eq(200)
    //         console.log(response.body)
    //         expect(response.body).length.to.be.eq(3)

    //     })


    // })

    

})