# PWA_1

## Installation

Pour tester si la PWA fonctionne chez vous, ouvrez un cmd à la racine du dossier et tapez `npm i` puis `npm start`.
Connectez votre smartphone/tablette/ce que vous voulez au même réseau que celui où est votre ordi, et avec le smartphone/tablette tapez dans la barre de l'URL : `<l'IP de votre ordi>:3000`. 
Ensuite, cliquez sur le menu des options, cliquez sur "Ajouter à l'écran d'accueil", rentrez le nom de l'appli, et validez.
Bravo, la PWA est installée.

## Prérequis

- Image en 192x192
- Un manifeste avec les paramètres 
	- "short_name", 
	- "name", 
	- "icons" (avec la taille d'icône spécifiée au-dessus),
	- "scope",
	- "start_url"
- un fichier JS contenant vos ServiceWorkers (dans mon projet, ce fichier s'appelle "sw.js" dans le dossier "public")

# Have fun !!!