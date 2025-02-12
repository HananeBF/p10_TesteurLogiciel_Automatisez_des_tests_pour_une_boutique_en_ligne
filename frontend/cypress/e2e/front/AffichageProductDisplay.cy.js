const baseURL = 'http://localhost:8080/#/'
const pageProduit = 'http://localhost:8080/#/products'


describe('products display from homepage with descriptions and stock', () => {

  it('doit afficher plusieurs produits dans la home avec image description prix stock et le bouton consulter', () => {
    cy.visit(baseURL)
    cy.get('#other-products').should('have.length.greaterThan', 0)
    cy.get('.list-products [data-cy="product-home"]').each(($product) => {
      //vérifier que l'image est présente et a une src
      cy.wrap($product).find('[data-cy="product-home-img"]').should('exist').and('have.attr', 'src').and('not.be.empty')
      //vérifier que le produit a un nom
      cy.wrap($product).find('[data-cy="product-home-name"]').should('exist').and('not.be.empty')
      //vérifier que le produit a un prix
      cy.wrap($product).find('[data-cy="product-home-price"]').should('exist').and('not.be.empty')
      //vérifier que le produit a un bouton pour consulter le produit qui contient le mot consulter
      cy.wrap($product).find('[data-cy="product-home-link"]').should('exist').and('contain.text', 'Consulter')
      //vérifier que le produit a une description
      cy.wrap($product).find('[data-cy="product-home-description"]').should('exist').and('not.be.empty')
    })

  })

  it('doit afficher plusieurs produits dans la page produits', () => {
    cy.visit(pageProduit)
    cy.get('#other-products').should('have.length.greaterThan', 0)
    cy.get('.list-products [data-cy="product"]').each(($product) => {
      //vérifier que l'image est présente et a une src
      cy.wrap($product).find('[data-cy="product-picture"]').should('exist').and('have.attr', 'src').and('not.be.empty')
      //vérifier que le produit a un bouton pour consulter le produit qui contient le mot consulter
      cy.wrap($product).find('[data-cy="product-link"]').should('exist').and('contain.text', 'Consulter')
      //vérifier que le produit a une description
      cy.wrap($product).find('[data-cy="product-description"]').should('exist').and('not.be.empty')
    })


  })

})
describe('product display  with descriptions and stock', () => {
  it('doit afficher les détails du produit produit 3', () => {
    cy.visit(pageProduit + '/3')
    cy.get('#product-detail').should('exist').and('not.be.empty')
    //vérifier que l'image est présente et a une src
    cy.get('[data-cy="detail-product-img"]').should('exist').and('have.attr', 'src').and('not.be.empty')
    //vérifier que le produit a une description
    cy.get('[data-cy="detail-product-description"]').should('exist').and('not.be.empty')
    //les infos du prix, stock, quantité sont dans le panier dans un formulaire vérifier les infos
    cy.get('[data-cy="detail-product-price"]').should('exist').and('not.be.empty')
    cy.get('[data-cy="detail-product-stock"]').should('exist').and('not.be.empty')
    


  })

  it('doit afficher les détails du produit produit 4', () => {
    cy.visit(pageProduit + '/4')
    cy.get('#product-detail').should('exist').and('not.be.empty')
    //vérifier que l'image est présente et a une src
    cy.get('[data-cy="detail-product-img"]').should('exist').and('have.attr', 'src').and('not.be.empty')
    //vérifier que le produit a une description
    cy.get('[data-cy="detail-product-description"]').should('exist').and('not.be.empty')
    //pour la fiche produit, les infos du prix, stock, quantité sont dans le panier dans un formulaire vérifier les infos
    cy.get('[data-cy="detail-product-price"]').should('exist').and('not.be.empty')
    cy.get('[data-cy="detail-product-stock"]').should('exist').and('not.be.empty')


  })

  it('doit afficher les détails du produit produit 5', () => {
    cy.visit(pageProduit + '/5')
    cy.get('#product-detail').should('exist').and('not.be.empty')
    //vérifier que l'image est présente et a une src
    cy.get('[data-cy="detail-product-img"]').should('exist').and('have.attr', 'src').and('not.be.empty')
    //vérifier que le produit a une description
    cy.get('[data-cy="detail-product-description"]').should('exist').and('not.be.empty')
    //pour la fiche produit, les infos du prix, stock, quantité sont dans le panier dans un formulaire vérifier les infos
    cy.get('[data-cy="detail-product-price"]').should('exist').and('not.be.empty')
    cy.get('[data-cy="detail-product-stock"]').should('exist').and('not.be.empty')


  })

  it('doit afficher les détails du produit produit 6', () => {
    cy.visit(pageProduit + '/6')
    cy.get('#product-detail').should('exist').and('not.be.empty')
    //vérifier que l'image est présente et a une src
    cy.get('[data-cy="detail-product-img"]').should('exist').and('have.attr', 'src').and('not.be.empty')
    //vérifier que le produit a une description
    cy.get('[data-cy="detail-product-description"]').should('exist').and('not.be.empty')
    //pour la fiche produit, les infos du prix, stock, quantité sont dans le panier dans un formulaire vérifier les infos
    cy.get('[data-cy="detail-product-price"]').should('exist').and('not.be.empty')
    cy.get('[data-cy="detail-product-stock"]').should('exist').and('not.be.empty')


  })

  it('doit afficher les détails du produit produit 7', () => {
    cy.visit(pageProduit + '/7')
    cy.get('#product-detail').should('exist').and('not.be.empty')
    //vérifier que l'image est présente et a une src
    cy.get('[data-cy="detail-product-img"]').should('exist').and('have.attr', 'src').and('not.be.empty')
    //vérifier que le produit a une description
    cy.get('[data-cy="detail-product-description"]').should('exist').and('not.be.empty')
    //pour la fiche produit, les infos du prix, stock, quantité sont dans le panier dans un formulaire vérifier les infos
    cy.get('[data-cy="detail-product-price"]').should('exist').and('not.be.empty')
    cy.get('[data-cy="detail-product-stock"]').should('exist').and('not.be.empty')


  })

  it('doit afficher les détails du produit produit 8', () => {
    cy.visit(pageProduit + '/8')
    cy.get('#product-detail').should('exist').and('not.be.empty')
    //vérifier que l'image est présente et a une src
    cy.get('[data-cy="detail-product-img"]').should('exist').and('have.attr', 'src').and('not.be.empty')
    //vérifier que le produit a une description
    cy.get('[data-cy="detail-product-description"]').should('exist').and('not.be.empty')
    //pour la fiche produit, les infos du prix, stock, quantité sont dans le panier dans un formulaire vérifier les infos
    cy.get('[data-cy="detail-product-price"]').should('exist').and('not.be.empty')
    cy.get('[data-cy="detail-product-stock"]').should('exist').and('not.be.empty')


  })

  it('doit afficher les détails du produit produit 9', () => {
    cy.visit(pageProduit + '/9')
    cy.get('#product-detail').should('exist').and('not.be.empty')
    //vérifier que l'image est présente et a une src
    cy.get('[data-cy="detail-product-img"]').should('exist').and('have.attr', 'src').and('not.be.empty')
    //vérifier que le produit a une description
    cy.get('[data-cy="detail-product-description"]').should('exist').and('not.be.empty')
    //pour la fiche produit, les infos du prix, stock, quantité sont dans le panier dans un formulaire vérifier les infos
    cy.get('[data-cy="detail-product-price"]').should('exist').and('not.be.empty')
    cy.get('[data-cy="detail-product-stock"]').should('exist').and('not.be.empty')


  })

  it('doit afficher les détails du produit produit 10', () => {
    cy.visit(pageProduit + '/10')
    cy.get('#product-detail').should('exist').and('not.be.empty')
    //vérifier que l'image est présente et a une src
    cy.get('[data-cy="detail-product-img"]').should('exist').and('have.attr', 'src').and('not.be.empty')
    //vérifier que le produit a une description
    cy.get('[data-cy="detail-product-description"]').should('exist').and('not.be.empty')
    //pour la fiche produit, les infos du prix, stock, quantité sont dans le panier dans un formulaire vérifier les infos
    cy.get('[data-cy="detail-product-price"]').should('exist').and('not.be.empty')
    cy.get('[data-cy="detail-product-stock"]').should('exist').and('not.be.empty')


  })

})
describe('produit inconnu erreur possible voire page 404', () => {
  it('doit afficher une 404 car le produit est inconnu', () => {
    cy.visit(pageProduit + '/X')
      cy.get('#product-detail').should('not.exist')
    //vérifier que l'image est présente et a une src
    cy.get('[data-cy="detail-product-img"]').should('not.exist')
    //vérifier que le produit a une description
    cy.get('[data-cy="detail-product-description"]').should('not.exist')
    //pour la fiche produit, les infos du prix, stock, quantité sont dans le panier dans un formulaire vérifier les infos
    cy.get('[data-cy="detail-product-form"] div').each(($infos) => {
      cy.wrap($infos).find('[data-cy="detail-product-price"]').should('not.exist')
      cy.wrap($infos).find('[data-cy="detail-product-stock"]').should('not.exist')
    })
    
  })
})
