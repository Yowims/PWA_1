# WoW Basics - Phase de découverte

## Concept

Le principe est donc de pouvoir afficher de manière très efficace les données du joueur que l'on aura spécifié. L'utilisateur rentrera le nom du personnage en jeu ainsi que le serveur sur lequel ce personnage est créé, et les fonctionnalités de l'application feront alors toutes les recherches possibles selon ces deux informations. L'accès à l'API étant sécurisé, un jeton d'accès est généré à chaque nouvelle entrée dans l'application.

## État de l'art

Voyons maintenant ce qui existe déjà sur le marché en termes d'application ou de services similaires.

### [Site officiel](https://worldofwarcraft.com/fr-fr/)

Bien évidemment, le concurrent direct de notre service est également celui qui nous fournit les informations relatives à notre application. Le site officiel du jeu propose la totalité des fonctions de WoW Basics, avec des comptes-rendus réguliers sur l'actualité du jeu ainsi que l'évolution des serveurs de jeu.

### Applications tierces non publiées (ou peu référencées)

Comme l'API que l'on utilise est Open Source, il doit très certainement exister de nombreuses applications non publiées ou avec peu de référencement proposant des services identiques ou similaires à ce que l'on propose. Nous ne sommes pas à l'abri qu'une de ces applications connaisse une explosion dans ses fréquentations, ce qui nous oblige é rester prudents et à toujours maintenir l'application. 

Après cette analyse, on peut dresser un tableau représentant les avantages et les inconvénients selon les applications citées précédemment :

| Avantages              |    Inconvénients           |
| :----------------------|:--------------------------:|
| Beaucoup de visibilité | Ciblage très peu pertinent |
| Trafic très important  | Beaucoup de sous-menus pour accéder à une simple fonctionnalité |
| Blizzard utilise des informations sur le site qui ne sont pas accessibles vie l'API |  |

## Design du site

### Fonctionnement

#### Qui?

L'application WoW Basics sera utilisée en grande partie par les joueurs de World of Warcraft, qui consitueront notre coeur de cible, ainsi que les personnes tierces qui souhaiteraient consulter les informations des personnages de certains joueurs connus.

#### Quoi?

L'application WoW Basics répond aux problèmes suivants :

- Consuter rapidement les informations de tous les personnages du jeu
- Permettre aux joueurs de faciliter leur expérience de jeu en leur évitant des déconnexions intempestives
- Éventuellement créer un certain esprit de compétition en permettant aux joueurs de comparer leurs progressions

#### Comment?

L'utilisateur devra rentrer le nom du personnage dont il souhaite voir les informations, ainsi que le serveur de jeu où ce personnage est créé. Une fois fait, un jeton d'accès est renvoyé par l'API de Blizzard, ce qui permettra à l'application de lancer toutes les autres fonctionnalités de l'application, à savoir :

- Afficher les haut-faits du personnage
- Afficher ses réputations dans les différentes factions du jeu
- Consulter le profil du personnage
- Voir la progression dans les donjons
- etc...

Si l'utilisateur souhaite changer de personnage pour vérifier d'autres informations, il pourra le faire en accédant au menu glissant à gauche de l'écran permettant la navigation entre les différentes pages du site.