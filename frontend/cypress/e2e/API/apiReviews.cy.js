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

// parcours nominal de post de review classique
describe('test API reviews nominal', () => {

    it('je peux poster un avis car je suis connectée', () => {
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
                    title: 'Super',
                    comment: "ça sent trop bon",
                    rating: 3
                },

            }).then((response) => {
                
                expect(response.status).to.eq(200)
            })
        })


    })
})

// // parcours alternatif : pas connectée, pas de post de review
describe('test API cas non passant car je ne suis pas connectée', () => {
    it('je ne peux pas poster un avis car je ne suis pas connectée', () => {
        cy.request({
            method: 'POST',
            url: apiReview,
            body: {
                title: 'Bof',
                comment: "trop de mousse",
                rating: 1
            },
            failOnStatusCode: false
        }).then((response) => {
            
            expect(response.status).to.eq(401)

        })
    })
})
