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
                },
                
            }).then ((response) => {
                console.log(response)
                expect(response.status).to.eq(200)
            })
        })


    })
})


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
            console.log(response)
            expect(response.status).to.eq(401)

        })
    })
})

describe('test API reviews secu', () => {
    it('je ne dois pas pouvoir poster un script de redirection', () => {
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
                    title: `<script>alert('XSS');</script>`,
                    comment: `<script type="text/javascript">window.location.replace("https://www.google.com/");</script>`,
                    rating: 1
                },
                failOnStatusCode: false
            }).then ((response) => {
                console.log(response)
                expect(response.status).to.eq(403)
                
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
                    title: `test cookie`,
                    comment: `<script type="text/javascript">alert(document.cookie)</script>`,
                    rating: 1
                },
                failOnStatusCode: false
            }).then ((response) => {
                console.log(response)
                expect(response.status).to.eq(403)
                
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
                    title: `<a href="http://test.fr>Clic ici</a>`,
                    comment: `<a href="http://test.fr>Clic ici</a>`,
                    rating: 1
                },
                failOnStatusCode: false
            }).then ((response) => {
                console.log(response)
                expect(response.status).to.eq(403)
            })
        })


    })
    it('je ne dois pas pouvoir poster un chevron', () => {
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
                    title: `Testons aussi les chevrons`,
                    comment: `< >`,
                    rating: 1
                },
                failOnStatusCode: false
            }).then ((response) => {
                console.log(response)
                expect(response.status).to.eq(403)
            })
        })


    })

    it('je ne dois pas pouvoir poster un script drop table', () => {
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
                    title: `drop table Utilisateurs`,
                    comment: `<script type="text/javascript">window.location.replace("https://www.google.com/")</script>`,
                    rating: 1
                },
                failOnStatusCode: false
            }).then ((response) => {
                console.log(response)
                expect(response.status).to.eq(403)
            })
        })


    })
})