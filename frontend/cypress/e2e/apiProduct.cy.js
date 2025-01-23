const baseURL = 'http://localhost:8080/#/'
let productId
const apiProductsHome = `${Cypress.env("apiUrl")}/products/random`
const apiProducts = `${Cypress.env("apiUrl")}/products`


describe('recupérer des prodruits via api with descriptions and stock', () => {
    beforeEach(() => {
        cy.visit(baseURL)


    })
    it('doit récupérer tous les produits de la base et extraire les id', () => {
        cy.request("GET", apiProducts).then((response) => {
            expect(response.status).to.eq(200)
            productId = response.body[Math.floor(Math.random() * response.body.length)].id
        })
    })

    it("Récupérer les détails d'un produit par id", () => {
        // Vérifiez que l'ID de catégorie a été extrait avec succès
        expect(productId).to.be.a("number")
        cy.request(apiProducts + `/${productId}`)
            .its("status")
            .should("eq", 200)
    })

    it('doit afficher 3 produits randoms dans la home avec image description prix stock et le bouton consulter', () => {
        cy.request("GET", apiProductsHome).then((response) => {

            expect(response.status).to.eq(200)
            expect(response.body).length.to.be.greaterThan(2)
            console.log(response.body)
            productId = response.body[0].id

            expect(response.body[0]).to.have.property('id')
            
            // expect(response.body).to.have.property('name')
            // expect(response.body.data).to.have.property('price')
            // expect(response.body.data).to.have.property('description')
            // expect(response.body.data).to.have.property('picture')
            // expect(response.body.data).to.have.property('availableStock')
        })


    })

    it("avoir un produit et son détail", () => {
        cy.request("GET", apiProducts + '/3').then((response) => {
            //console.log(response.body)
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('price')
            expect(response.body).to.have.property('description')
            expect(response.body).to.have.property('picture')
            expect(response.body).to.have.property('availableStock')
        })
    })

})
