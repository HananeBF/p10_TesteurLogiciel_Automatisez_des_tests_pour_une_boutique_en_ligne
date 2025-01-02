/*
En tant que client sur la page d'accueil du site EcoBlass
lorsque je clique sur la page de connexion (baseURL+'/login')
que la page retourne une 200 et s'affiche
que le formulaire s'affiche
que je trouve input l'email : data-cy="login-input-username"
que je saisie "test2@test.fr" dans l'input
que je trouve input MDP : data-cy="login-input-password"
que je saisie “testtest” dans l'input
que je trouve le bouton de connexion : data-cy="login-submit"
que je clique sur ce bouton

Alors, je suis connectée et je vois la page du panier
et le bouton Connexion devient Déconnexion


non passant : page inexistante
En tant que client sur la page d'accueil du site EcoBlass
lorsque je clique sur la page de connexion (baseURL+'/login')
mais que la page ne s'affiche pas 
Alors, j'ai une page d'erreur


non passant : formulaire ne charge pas
En tant que client sur la page d'accueil du site EcoBlass
lorsque je clique sur la page de connexion (baseURL+'/login')
 
Alors, la page de connexion s'affiche mais pas le formulaire

non passant : formulaire ne charge pas correctement manque input email
En tant que client sur la page d'accueil du site EcoBlass
lorsque je clique sur la page de connexion (baseURL+'/login')
et que la page de connexion s'affiche avec le formulaire
que je cherche input l'email : data-cy="login-input-username"
Alors, je ne trouve pas l'input email, et l'API me retourne une erreur

non passant : formulaire ne charge pas correctement manque input MDP

En tant que client sur la page d'accueil du site EcoBlass
lorsque je clique sur la page de connexion (baseURL+'/login')
et que la page de connexion s'affiche avec le formulaire
que je cherche input l'email  data-cy="login-input-password"
 
Alors, je ne trouve pas l'input MPD et l'API me retourne une erreur

non passant : formulaire ne charge pas correctement manque bouton de soumission

En tant que client sur la page d'accueil du site EcoBlass
lorsque je clique sur la page de connexion (baseURL+'/login')
que la page retourne une 200 et s'affiche
que le formulaire s'affiche 
que je trouve input l'email : data-cy="login-input-username"
MAIS que je saisie un email invalide  autre que "test2@test.fr" dans l'input
que je trouve input MDP : data-cy="login-input-password"
que je saisie “testtest” dans l'input
que je cherche le bouton de connexion : data-cy="login-submit"
 
Alors, je ne trouve pas le bouton de soumission et l'API me retourne une erreur

non passant : erreur email
En tant que client sur la page d'accueil du site EcoBlass
lorsque je clique sur la page de connexion (baseURL+'/login')
que la page retourne une 200 et s'affiche
que le formulaire s'affiche 
que je trouve input l'email : data-cy="login-input-username"
MAIS que je saisie un email invalide  autre que "test2@test.fr" dans l'input
que je trouve input MDP : data-cy="login-input-password"
que je saisie “testtest” dans l'input
que je trouve le bouton de connexion : data-cy="login-submit"
que je clique sur ce bouton
Alors, j'ai un message d'erreur

non passant : erreur MDP
En tant que client sur la page d'accueil du site EcoBlass
lorsque je clique sur la page de connexion (baseURL+'/login')
que la page retourne une 200 et s'affiche
que le formulaire s'affiche 
que je trouve input l'email : data-cy="login-input-username"
que je saisie un email "test2@test.fr" dans l'input
que je trouve input MDP : data-cy="login-input-password"
que je saisie un mdp invalide autre que  “testtest” dans l'input
que je trouve le bouton de connexion : data-cy="login-submit"
que je clique sur ce bouton
Alors, j'ai un message d'erreur

non passant : pas d'affichage page panier 
En tant que client sur la page d'accueil du site EcoBlass
lorsque je clique sur la page de connexion (baseURL+'/login')
que la page retourne une 200 et s'affiche
que le formulaire s'affiche 
que je trouve input l'email : data-cy="login-input-username"
que je saisie un email "test2@test.fr" dans l'input
que je trouve input MDP : data-cy="login-input-password"
que je saisie un mdp  “testtest” dans l'input
que je trouve le bouton de connexion : data-cy="login-submit"
que je clique sur ce bouton
mais que la connexion au serveur est impossible
Alors, j'ai un page d'erreur (exemple 5xx)
  })
  
*/

const baseURL = 'http://localhost:8080/'


describe('Connexion avec email et mot de passe depuis la page Accueil puis affichage panier', () => {
      beforeEach(( => {
        cy.visit(baseURL)
      }))
      
      it('passes', () => {
        cy.visit(baseURL+'/')
        cy.get('[data-cy="nav-link-login"]').should('contain', 'Connexion')
      })


})