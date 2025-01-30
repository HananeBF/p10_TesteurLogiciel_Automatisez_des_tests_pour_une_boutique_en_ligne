const apiLogin = `${Cypress.env("apiUrl")}/login`
const apiReview = `${Cypress.env("apiUrl")}/reviews`

describe('test API reviews nominal', () => {
it('je peux poster un avis car je suis connectée', () => {
    cy.request({
      method: 'POST',
      url: apiLogin,
      headers: {
        "content-Type": "application.json",
        "accept": "*/*",
    },
      body: {
        username: 'test2@test.fr',
        password: 'testtest'
      }
    }).then((response) => {
        console.log(response)
      expect(response.status).to.eq(200)
      localStorage.setItem("token", response.body.token).as("token")
    })
    cy.request({
        method:'POST',
        url: apiReview,
        headers: {
            "content-Type": "application.json",
            "accept": "*/*",
            "Authorization": "Bearer: " + token
            //reponse du test token undefined, donc, je le récupère mal
        },
        body: {
            title: 'Super !',
            message: "ça sent trop bon"
        }

    })
  })
})

describe('test API cas non passant', () => {
    it('je ne peux pas poster un avis car je suis connectée', () => {
        cy.request({
            method:'POST',
            url: apiReview,
            headers: {
                "content-Type": "application.json",
                "accept": "*/*",
            },
            body: {
                title: 'Super !',
                message: "ça sent trop bon"
            }
        }).then((response) => {
            console.log(response)
          expect(response.status).to.eq(401)
          
    
        })
      })
    })