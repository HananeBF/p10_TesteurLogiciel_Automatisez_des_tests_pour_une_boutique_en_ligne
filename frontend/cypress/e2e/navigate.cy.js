const baseURL = 'http://localhost:8080/#'

describe('visit all pages', () => {
  beforeEach(() => {
    cy.visit(baseURL)
})
  it('passes', () => {
    cy.visit(baseURL+'/')
  })

  it('passes', () => {
    cy.visit(baseURL+'/products')
  })

  it('passes', () => {
    cy.visit(baseURL+'/reviews')
  })

  it('passes', () => {
    cy.visit(baseURL+'/login')
  })
  
  it('passes', () => {
    cy.visit(baseURL+'/register')
  })
  it('passes', () => {
    cy.get('[data-cy="nav-link-home-logo"]').click()
  })

})