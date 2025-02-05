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
                }


            }).then ((response) => {
                console.log(response)
                expect(response.status).to.eq(200)
            })
        })


    })
})

describe('test API cas non passant', () => {
    it('je ne peux pas poster un avis car je ne suis pas connectée', () => {
        cy.request({
            method: 'POST',
            url: apiReview,
            headers: {
                "Authorization": ""
            },
            body: {
                title: 'Super',
                comment: "ça sent trop bon",
                rating: 3
            }
        }).then((response) => {
            console.log(response)
            expect(response.status).to.eq(401)

        })
    })
})