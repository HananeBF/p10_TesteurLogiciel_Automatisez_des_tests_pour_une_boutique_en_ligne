const apiProduct = `${Cypress.env("apiUrl")}/products`;
context("GET /products", () => {
    it("avoir une liste de produits", () => {
        cy.request("GET", apiProduct).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).length.to.be.greaterThan(3)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('price')
            expect(response.body).to.have.property('description')
            expect(response.body).to.have.property('picture')
            expect(response.body).to.have.property('availableStock')
        })
    })
    it("avoir un produit et son détail", () => {
        cy.request("GET", apiProduct+'/3').then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).length.to.be.greaterThan(3)
            expect(response.body).to.have.property('id')
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('price')
            expect(response.body).to.have.property('description')
            expect(response.body).to.have.property('picture')
            expect(response.body).to.have.property('availableStock')
        })
    })
})