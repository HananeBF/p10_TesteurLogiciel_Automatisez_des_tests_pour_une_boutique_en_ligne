const apiLogin = `${Cypress.env("apiUrl")}/login`
const apiReview = `${Cypress.env("apiUrl")}/reviews`
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
            win.localStorage.setItem("authToken", response.body.token);
        })

    })
}

// tests de sécurité avec posts alternatifs
describe('test API reviews secu failles XSS', () => {
    it('doit empêcher les failles XSS script', () => {
        login()
        let cat = null
        cy.window().then((win) => {
            // stocker le token pour accéder aux avis
            cat = win.localStorage.getItem("authToken")



            cy.request({
                method: 'POST',
                url: apiReview,
                headers: {
                    "Authorization": "Bearer " + cat

                },
                body: {
                    title: `Vérifions les failles`,
                    comment: `<'script>alert("XSS")</script>`,
                    rating: 1
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).not.to.eq(200)
                expect(response.body).to.have.property('error')
            })
        })
    })
})


it('doit empêcher les failles XSS img', () => {
    login()
    let cat = null
    cy.window().then((win) => {
        // stocker le token pour accéder aux avis
        cat = win.localStorage.getItem("authToken")



        cy.request({
            method: 'POST',
            url: apiReview,
            headers: {
                "Authorization": "Bearer " + cat

            },
            body: {
                title: `Vérifions les failles`,
                comment: `<img src="x" onerror="alert(\'XSS\')">`,
                rating: 1
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).not.to.eq(200)
            expect(response.body).to.have.property('error')
        })

    })
})
it('doit empêcher les failles XSS svg', () => {
    login()
    let cat = null
    cy.window().then((win) => {
        // stocker le token pour accéder aux avis
        cat = win.localStorage.getItem("authToken")

        //cy.wrap(payloads).each((payload) => {
        cy.request({
            method: 'POST',
            url: apiReview,
            headers: {
                "Authorization": "Bearer " + cat

            },
            body: {
                title: `Vérifions les failles`,
                comment: '<svg onload="alert(\'XSS\')"></svg>',
                rating: 1
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).not.to.eq(200)
            expect(response.body).to.have.property('error')
        })

    })
})

it('je ne dois pas pouvoir poster un script pour récupérer un cookie', () => {
    login()
    let cat = null
    cy.window().then((win) => {
        // stocker le token pour accéder aux avis
        cat = win.localStorage.getItem("authToken")

        cy.request({
            method: 'POST',
            url: apiReview,
            headers: {
                "Authorization": "Bearer " + cat

            },

            body: {
                title: `récupération de cookies pour tous`,
                comment: `<script type="text/javascript">alert(document.cookie)</script>`,
                rating: 2
            },
            failOnStatusCode: false
        }).then((response) => {
            console.log(response)
            expect(response.body).to.have.property('error')
            expect(response.status).not.to.eq(200)

            //expect(response.body).to.have.property(console.warn)

        })
    })


})

describe('test API reviews avec redirection', () => {
    it('je ne dois pas pouvoir poster une redirection avec une refresh', () => {
        login()
        let cat = null
        cy.window().then((win) => {
            // stocker le token pour accéder aux avis
            cat = win.localStorage.getItem("authToken")

            //cy.wrap(payloads).each((payload) => {
            cy.request({
                method: 'POST',
                url: apiReview,
                headers: {
                    "Authorization": "Bearer " + cat

                },

                body: {
                    title: `redirection possible ?`,
                    comment: `<meta http-equiv="refresh" content="0;url=http://google.com">`,
                    rating: 3
                },
                failOnStatusCode: false
            }).then((response) => {
                console.log(response)
                expect(response.status).not.to.eq(200)
                expect(response.body).to.have.property('error')


            })



        })

        it('je ne dois pas pouvoir poster une script de redirection', () => {
            login()
            let cat = null
            cy.window().then((win) => {
                // stocker le token pour accéder aux avis
                cat = win.localStorage.getItem("authToken")

                cy.request({
                    method: 'POST',
                    url: apiReview,
                    headers: {
                        "Authorization": "Bearer " + cat

                    },

                    body: {
                        title: `redirection possible ?`,
                        comment: `<script>window.location.replace("http://www.google.fr")</script>`,
                        rating: 3
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    console.log(response)
                    expect(response.status).not.to.eq(200)
                    expect(response.body).to.have.property('error')
                    
                    //expect(response.body).to.have.property(console.warn)

                })
            })
        })

        it('je ne dois pas pouvoir poster un lien', () => {
            login()
            let cat = null
            cy.window().then((win) => {
                // stocker le token pour accéder aux avis
                cat = win.localStorage.getItem("authToken")

                cy.request({
                    method: 'POST',
                    url: apiReview,
                    headers: {
                        "Authorization": "Bearer " + cat

                    },

                    body: {
                        title: `D'autres promos encore sur cette page`,
                        comment: `<a href="http://google.fr>Clic ici</a>`,
                        rating: 1
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    console.log(response)
                    expect(response.status).to.eq(403)
                    expect(response.body).to.have.property('error')
                })
            })
        })

        
    })
})
