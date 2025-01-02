const baseURL = 'http://localhost:8080/#'


describe('visit all pages via NavBar', () => {
    
it('passes', () => {
    cy.visit(baseURL+'/')
    cy.get('[data-cy="nav-link-home"]').should('contain', 'Accueil')
  })

//l'idée est que l'élément soit trouvé, qu'il y ait bien écrit Accueil puis click sur le lien trouvé depuis sa classe
})