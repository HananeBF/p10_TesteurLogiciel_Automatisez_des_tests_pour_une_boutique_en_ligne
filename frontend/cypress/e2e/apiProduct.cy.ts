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
        cy.request(`GET`, apiProducts + '3')
            .then((response) => {
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