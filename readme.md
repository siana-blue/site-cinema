# Premier site web - Cinéma associatif

Ce projet est mon premier site web, dans le cadre de mon apprentissage.

Il est également un projet associatif puisqu'il a pour vocation à mettre à jour le site web du cinéma associatif dans lequel je suis bénévole. Actuellement constitué de pages HTML/CSS statiques, mises à jour à la main par le webmaster du cinéma, je souhaite proposer une application Web dynamique, avec gestion des données en BDD pour la mise à jour des films de chaque semaine.

Frontend : HTML/CSS (Sass) - Javascript -- Pas de framework pour ce premier projet
Backend : NodeJS - MongoDB -- Express (views : PUG)

## Frontend

Le dossier "public" est servi en statique par express. Il inclut les images et les PJ du site, ainsi que les feuilles de styles CSS (sous-dossier "styles") et les scripts exécutés côté client (sous-dossier "scripts").

Les pages HTML sont générées côté serveur avec des templates PUG complétés par requêtes de BDD.

A IMPLEMENTER
La page "index.html" est la seule a être statique et à contenir des composants AJAX. Le site étant prévu pour pouvoir être affiché sur une machine sans Javascript, les données "AJAX" sont optionnelles (affiche des films du moment, actualités etc...) et peuvent toutes être retrouvées par l'utilisateur via les pages spécialisées qui sont quant à elles servies en HTML statique par le backend (via templates PUG).

## Backend

Express : view engine = PUG, sous-dossier des views nommé "views"

Autres sous-dossiers du backend (tous les dossiers autres que "public") :

- controllers
- routes
  Ces deux sous-dossiers contiennent des fichiers appairés (par exemple "pageController.js" et "page.js" respectivement). Le fichier du contrôleur contient un ensemble de méthodes, qui sont chacune liées à un URL dans le fichier route.
- models
  Ce dossier contient les modèles MongoDB (actuellement uniquement les séances des films, dans le dossier "movie.js").

## Architecture du projet

- Point d'entrée : server.js -> require app.js : création de l'app lancée sur le serveur
- Variables globales : var.js
- db.js : fichier regroupant les fonctions de requêtes sur BDD (actuellement MongoDB et API Tmdb pour les données sur les films)

## Notes

Le chat oublie des infos à certains endroits, obfuscat ne chasse pas le contenu des PUG notamment, mais rien n'est secret !

J'essaye de spécifier en HTML les champs width et height des images, comme recommandé dans l'articile suivant :
https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/
Pour le fichier movie.pug, je ne veux pas demander à l'utilisateur d'entrer ces champs, et je n'ai pas encore regardé comment les récupérer automatiquement, ainsi je mets par défaut les valeurs 150 et 200. Ce sera à améliorer.

La gestion des erreurs sera à approfondir plus tard, c'est très brouillon actuellement.

Un gros refactor du code sera nécessaire, je code ce site en "speedrun" pour avoir quelque chose de fonctionnel et on fera du rangement et du commentaire ensuite. Pour l'instant, trop d'apprentissage, trop de nouveaux concepts à chaque itération pour que je commence à tout bien structurer.

Des fichiers seront à supprimer, après refonte de refonte du code, du ménage est à faire. Je m'en occuperai dès que j'aurai une version viable.
