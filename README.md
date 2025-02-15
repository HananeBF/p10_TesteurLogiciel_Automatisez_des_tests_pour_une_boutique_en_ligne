# EcoBlissBath

<img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
<img src="https://img.shields.io/badge/Cypress-v13.17.0-green">

## Installation du projet
-Téléchargez ou clonez le dépôt  
-Depuis un terminal ouert dans le dossier du projet, lancer la commande : sudo docker-compose up --build  
-Ouvrez le site depuis la page http://localhost:8080  


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

### Lancement de Cypress via le terminal

A la fin de l'installation, si vous préférez utiliser le terminal poour voir le lancement des tests, vous pouvez utiliser cette commande 

``` 
npx cypress run
```
Un rapport des cas de test en success et des cas de tests en fail s'affichera à la fin de la campagne.

Un dossier avec les screenshots des echecs sera installé dans le dossier Cypress, avec un sous-dossier pour chaque test qui a échoué.


### Lancement de Cypress via le Launchpad 

A la fin de l'installation, vous pourrez lancer le launchpad de Cypress via cette commande

``` 
npx cypress open
```

#### Launchpad Cypress

A l'excécution, la fenêtre Cypress vous propose le E2E testing ou Component Testing. 
Choississez E2E Testing.

#### Choix du Browser

Vous devrez ensuite choisir votre navigateur (Chrome, Edge, Electron ou Firefox)
Et cliquez ensuite sur le bouton Start E2E Testing in -Nom du navigateur choisi-

#### Specs
Par défaut, vous êtes dirigé vers le dossier de Specs.
Actuellement, les tests sont sauvegardés dans cet onglet dans le dossier E2E suivant  

\cypress\e2e

Vous trouverez les tests dans les dossiers API, front et smoketest

Cliquez sur le test voulu, Cypress vous dirigera vers une une fenêtre où vous verrez le test être exécuté à chaque step.

A la fin du test, vous pourrez constater défauts ou réussites du fichier de test.

Les snapshots sont disponibles pour repérér l'anomalie en cours.