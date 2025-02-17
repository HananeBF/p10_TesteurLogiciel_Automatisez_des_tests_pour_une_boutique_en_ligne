const baseURL = 'http://localhost:8080/#'
const apiLogin = `${Cypress.env("apiUrl")}/login`

describe('template spec', () => {
  it('passes', () => {
    cy.visit(baseURL)
  })
})