# EcoBlissBath


cypress": "^13.17.0

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Tests fonctionnels et API via Cypress

### Vérifiez l\'environnement Node

Une fois le dépôt cloné et docker lancé, depuis un nouveau terminal entrez dans le dossier frontend, et installez Node.js

``` 
npm install 
```

### Cypress pour les tests API et fonctionnels (E2E ou components)


Installez Cypress via votre gestionnaire de paquets 

``` 
npm install cypress --save-dev
```

Pour le lancement de Cypress, vous pourrez lancer les tests automatisés via le terminal ou via le Launchpad.

### lancement de Cypress via le terminal

A la fin de l'installation, si vous préférez utiliser le terminal poour voir le lancement des tests, vous pouvez utiliser cette commande 

``` 
npx cypress run
```
Un rapport des tests en success et des tests en fail s'affichera à la fin des jeux de tests.

Un dossier avec les screenshots des echecs des tests sera installé dans le dossier Cypress, avec un sous-dossier pour chaque nom de test qui a échoué.


### Lancement de Cypress avec Launchpad 

A la fin de l'installation, vous pourrez lancer le launchpad de Cypress via cette commande

``` 
npx cypress open
```

#### Launchpad Cypress

A l'excécution, la fenêtre Cypress vous propose le E2E testing ou Component Testing. 
Choississez E2E Testing.

#### Browser

Vous devrez ensuite choisir votre navigateur (Chrome, Edge, Electron ou Firefox)
Et cliquez ensuite sur le bouton Start E2E Testing in -Nom du navigateur choisi-

#### Specs
Par défaut, vous êtes dirigé vers le dossier de Specs.
Actuellement, les tests sont sauvegardés dans le dossier E2E suivant 

\cypress\e2e

Vous trouverez les tests dans les dossiers API, front et smoketest

Cliquez sur le test voulu, Cypress vous dirigera vers une une fenêtre ou vous verrez le test être exécuté à chaque step.
A la fin du test, vous pourrez constater les fails ou success du tests.
Les snapshots sont disponibles pour repérér l'anomalie en cours.

