const apiProduct = `${Cypress.env("apiUrl")}/products`;
context("GET /products", () => {
    it("avoir une liste de produits", () => {
        cy.request("GET", apiProduct).then((response) => {
            console.log(response.body)
            expect(response.status).to.eq(200)
            expect(response.body).length.to.be.greaterThan(7)
            
            
        })
    })
   
})