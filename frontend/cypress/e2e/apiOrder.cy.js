const apiLogin = `${Cypress.env("apiUrl")}/login`
const apiProduct = `${Cypress.env("apiUrl")}/products`
const apiOrder = `${Cypress.env("apiUrl")}/orders`
const apiAdd = `${Cypress.env("apiUrl")}/orders/add`
let productId
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


describe('test api ajout de produit dans le panier poduit avec stock', () => {
    it('parcours nominal connectée, on ajoute 1 produit dans le panier sans rupture de stock id 9 et on voit le panier', () => {
        login()
        let cat = null
        cy.window().then((win) => {
            cat = win.localStorage.getItem("authToken")
            cy.request("GET", apiProduct + '/9').then((response) => {

                expect(response.status).to.eq(200)
                //expect(response.body).to.have.property('availableStock').and.be.gte(1)

                cy.request({
                    method: 'PUT',
                    url: apiAdd,
                    headers: {
                        "Authorization": "Bearer " + cat
                    },
                    body: {
                        product: 9,
                        quantity: 1

                    }
                }).then((response) => {
                    console.log(response)
                    expect(response.status).to.eq(200)
                })
            }).then((response) => {
                console.log(response)
                expect(response.status).to.eq(200)
            })
            cy.request({
                method: 'GET',
                url: apiOrder,
                headers: {
                    "Authorization": "Bearer " + cat
                    
                }
            }).then((response) => {
               
                expect(response.status).to.eq(200)
                console.log(response.body)
                let orderList = response.body
                //expect(orderList).length.to.be.greaterThan(1)
                expect(orderList).to.be.an('array')
            })
        })
    })


})

describe('ajout en erreur car produit out of stock', () => {
    it('je dois avoir une erreur car ajout de produit out of stock Sentiments printaniers -3 ', () => {
        login()
        let cat = null
        cy.window().then((win) => {
            cat = win.localStorage.getItem("authToken")
            cy.request("GET", apiProduct + '/3').then((response) => {
                expect(response.body).to.have.property('availableStock').and.be.gte(1)

                cy.request({
                    method: 'PUT',
                    url: apiAdd,
                    headers: {
                        "Authorization": "Bearer " + cat
                    },
                    body: {
                        product: 3,
                        quantity: 1

                    }
                }).then ((response) => {
                    console.log(response)
                    expect(response.status).to.eq(401)
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


