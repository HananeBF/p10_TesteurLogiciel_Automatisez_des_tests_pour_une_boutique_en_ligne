const apiLogin = `${Cypress.env("apiUrl")}/login`
const apiProduct = `${Cypress.env("apiUrl")}/products`
const apiOrder = `${Cypress.env("apiUrl")}/orders`
const apiAdd = `${Cypress.env("apiUrl")}/orders/add`
let productId
let productName
const apiProducts9 = `${Cypress.env("apiUrl")}/products/9`

const login = () => {
    cy.request({
        method: 'POST',
        url: apiLogin,
        body: {
            username: 'test2@test.fr',
            password: 'testtest'
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        cy.window().then((win) => {
            win.localStorage.setItem("authToken", response.body.token)
        })

    })
}


describe('test api ajout de produit dans le panier produit avec stock', () => {
    it('parcours nominal connexion, ajout 1 produit avec stock ou disponible dans le panier - id 10 - et on le voit le panier', () => {
        login()
        let cat = null
        cy.window().then((win) => {
            cat = win.localStorage.getItem("authToken")
            cy.request("GET", apiProduct + '/10').then((response) => {

                expect(response.status).to.eq(200)

                //avoir plus d'un produit en stock pour le commander
                expect(response.body).to.have.property('availableStock').and.be.gte(1)
                console.log(response.body.id)
                productId = response.body.id
                console.log(productId)



                // ajouter le produit 
                return cy.request({
                    method: 'PUT',
                    url: apiAdd,
                    headers: {
                        "Authorization": "Bearer " + cat
                    },
                    body: {
                        product: productId,
                        quantity: 1

                    }
                }).then((response) => {
                    console.log(productId)

                    //console.log(response)
                    expect(response.status).to.eq(200)
                })
            }).then(() => {
                //vérifier que le panier inclut le nouveau produit
                return cy.request({
                    method: 'GET',
                    url: apiOrder,
                    headers: {
                        "Authorization": "Bearer " + cat
                    }
                }).then((response) => {

                    //console.log(response.body)
                    expect(response.status).to.eq(200)

                    let orderList = response.body.orderLines
                    expect(orderList).length.to.be.greaterThan(1)
                    expect(orderList).to.be.an('array')

                    const produitExiste = orderList.some(item => item.product.id === productId)
                    // Vérifier que le produit existe dans le panier
                    expect(produitExiste).to.be.true


                })
            })
        })


    })
})

describe('ajout en erreur car produit out of stock', () => {
    it('je dois avoir une erreur car ajout de produit out of stock produit id 3 stock négatif ', () => {
        login()
        let cat = null
        cy.window().then((win) => {
            cat = win.localStorage.getItem("authToken")
            cy.request("GET", apiProduct + '/3').then((response) => {
                expect(response.status).to.eq(200)

                //avoir plus d'un produit en stock pour le commander
                //expect(response.body).to.have.property('availableStock').and.be.gte(1)
                console.log(response.body.id)
                productId = response.body.id
                console.log(productId)

                cy.request({
                    method: 'PUT',
                    url: apiAdd,
                    headers: {
                        "Authorization": "Bearer " + cat
                    },
                    body: {
                        product: productId,
                        quantity: 1
                    }
                }).then((response) => {
                

                    //console.log(response.body)
                    expect(response.status).not.be.eq(200)
                    // si j'ai 200, le test est un échec
                    let orderList = response.body.orderLines


                    const produitExiste = orderList.some(item => item.product.id === productId)
                    // je dois vérifier que le produit existe bien dans le panier après son ajout
                    expect(produitExiste).to.be.false


                })
            })
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
})


