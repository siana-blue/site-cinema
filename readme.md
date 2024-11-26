# Premier site web - Cinéma associatif

Ce projet est mon premier site web, dans le cadre de mon apprentissage.

Il est également un projet associatif puisqu'il a pour vocation à mettre à jour le site web du cinéma associatif dans lequel je suis bénévole. Actuellement constitué de pages HTML/CSS statiques, mises à jour à la main par le webmaster du cinéma, je souhaite proposer une application Web dynamique, avec gestion des données en BDD pour la mise à jour des films de chaque semaine.

Frontend : HTML/CSS (Sass) - Javascript -- Pas de framework pour ce premier projet
Backend : NodeJS - MongoDB -- Express (views : PUG)

## Frontend

Le dossier "public" est servi en statique par express. Il inclut les images et les PJ du site, ainsi que les feuilles de styles CSS (sous-dossier "styles") et les scripts exécutés côté client (sous-dossier "scripts").

Les pages HTML sont générées côté serveur avec des templates PUG complétés par requêtes de BDD.

## Backend

Express : view engine = PUG, sous-dossier des views nommé "views"

Autres sous-dossiers du backend (tous les dossiers autres que "public") :

- controllers
- routes
  Ces deux sous-dossiers contiennent des fichiers appairés (par exemple "pageController.js" et "page.js" respectivement). Le fichier du contrôleur contient un ensemble de méthodes, qui sont chacune liées à un URL dans le fichier du routeur.
- models
  Ce dossier contient les modèles MongoDB (actuellement uniquement les séances des films, dans le fichier "movie.js").

## Architecture du projet

- Point d'entrée : server.js -> require app.js : création de l'app lancée sur le serveur
- Variables globales : var.js
- Fonctions génériques : utils.js

## Liste des URLs

### MOVIES : gestion des films et des séances

GET /movies : liste des films depuis MongoDB

- render via PUG la structure de la page, chargement du script côté client
- le script client effectue les requêtes MongoDB (tris et filtres) et affiche les films (via famille d'URL DB)

GET /movies/new : charge le formulaire de création d'un nouveau film
GET /movies/:id : charge le formulaire de création d'un film, initialisé avec le film dont l'ID TMDB est spécifié, ou redirige vers "new" si l'ID est introuvable.

- dans les deux cas, un script client accompagne le formulaire (généré par PUG) pour gérer la sélection d'un film depuis TMDB à partir d'une recherche textuelle. L'interface entre ce script client et l'API TMDB se fait par les URL DB.

POST /movies : en body, le contenu du formulaire de création d'un film => sauvegarde sous MongoDB.

### DB : URL dédiés aux scripts clients pour requêtes AJAX

La base MongoDB contient les films avec l'id TMDB, les tags associés au film (jeunesse, coup de coeur...) et les séances programmées.

GET /db/tmdb?title : retourne une liste d'ID TMDB correspondant à la recheche textuelle "title"

GET /db/info?id : retourne les données du film dont l'id TMDB est fourni en paramètre.

GET /db/movies?sort=next_session|title&filter=Coup_de_coeur+Jeunesse+Patrimoine&start_date=dd-mm-yyyy&end_date=dd-mm-yyyy
(Les critères de tri ne sont pas cumulables, les filtres le sont. Aucun paramètre n'est obligatoire.)

- next_session : la première séance située après start_date (si précisée) est prise en compte pour le tri chronologique.

Pour les deux dernières requêtes, la valeur de retour est un objet JSON {data, html} où data et HTML peuvent être des objets simples ou des tableaux s'il y a plusieurs valeurs de retours.
data et HTML sont respectivement les données JSON brutes de la réponse, et une version rendered par PUG de ces mêmes données.

### PAGE : génération des pages consultées par les utilisateurs

Contrairement aux autres couples routeur/contrôleur, ici les URL associés n'ont pas de racine commune.

GET / : génère la page d'accueil du site
GET /planning : génère la page avec la programmation des quatre prochaines semaines

## Notes

J'essaye de spécifier en HTML les champs width et height des images, comme recommandé dans l'articile suivant :
https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/
Pour le fichier movie.pug, je ne veux pas demander à l'utilisateur d'entrer ces champs, et je n'ai pas encore regardé comment les récupérer automatiquement, ainsi je mets par défaut les valeurs 150 et 200. Ce sera à améliorer.

La gestion des erreurs sera à approfondir plus tard, c'est très brouillon actuellement.

Un gros refactor du code sera nécessaire, je code ce site en "speedrun" pour avoir quelque chose de fonctionnel et on fera du rangement et du commentaire ensuite. Pour l'instant, trop d'apprentissage, trop de nouveaux concepts à chaque itération pour que je commence à tout bien structurer.

Des fichiers seront à supprimer, après refonte de refonte du code, du ménage est à faire. Je m'en occuperai dès que j'aurai une version viable.
