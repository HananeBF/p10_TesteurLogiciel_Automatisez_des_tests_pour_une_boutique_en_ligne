const apiLogin = `${Cypress.env("apiUrl")}/login`

describe('test API login passant', () => {
it('test API doit retourner 200 pour un utilisateur connu', () => {
    cy.request({
      method: 'POST',
      url: apiLogin,
      body: {
        username: 'test2@test.fr',
        password: 'testtest'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
    })
  })
})

describe('test API login non passant', () => {
    it('devrait échouer avec un mauvais login et mdp', () => {
      cy.request({
        method: 'POST',
        url: apiLogin,
        body: {
          username: 'false@email.com',
          password: 'MDP'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401)
        
        
      })
    })
    
    it('devrait échouer avec un mauvais login', () => {
        cy.request({
          method: 'POST',
          url: apiLogin,
          body: {
            username: 'false@email.com',
            password: 'testtest'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401)
        })
      })

      it('devrait échouer avec un mauvais mot de passe', () => {
        cy.request({
          method: 'POST',
          url: apiLogin,
          body: {
            username: 'test2@test.fr',
            password: 'MDP1685465657'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401)
        })
      })

      it('devrait échouer car une valeur username vide', () => {
        cy.request({
          method: 'POST',
          url: apiLogin,
          body: {
            username: '',
            password: 'testtest'
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401)
        })
      })
      it('devrait échouer car une valeur mot de passe vide', () => {
        cy.request({
          method: 'POST',
          url: apiLogin,
          body: {
            username: 'test2@test.fr',
            password: ''
          },
          failOnStatusCode: false
        }).then((response) => {
          expect(response.status).to.eq(401)
        })
      })
})
