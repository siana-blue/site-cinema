# Premier site web - Cinéma associatif

Ce projet est mon premier site web, dans le cadre de mon apprentissage.

Il est également un projet associatif puisqu'il a pour vocation à mettre à jour le site web du cinéma associatif dans lequel je suis bénévole. Actuellement constitué de pages HTML/CSS statiques, mises à jour à la main par le webmaster du cinéma, je souhaite proposer une application Web dynamique, avec gestion des données en BDD pour la mise à jour des films de chaque semaine.

Frontend : HTML/CSS (Sass) - Javascript -- Pas de framework pour ce premier projet
Backend : NodeJS - MongoDB -- Express (views : PUG)

Les fichiers HTML sont "obfusqués" par mon chat (script obfuscat de mon repository "utils").
Cela a été fait manuellement en prenant les fichiers HTML du répertoire "public" pour les traiter par "node ./obfuscat.js" du repository "utils" avant de les replacer ici avant commit.

## Frontend

Presque terminé pour la partie mise en page HTML/CSS, certains boutons ne sont pas encore actifs.

Le frontend est constitué de fichiers HTML/CSS statiques, stockés dans "public", transférés par la fonction express.static("public").
Les views PUG ne sont utilisées que pour la mise en page par le webmaster, et non en dynamique sur requête de l'utilisateur.

Dans l'utilisation courante du site, tous les fichiers utiles sont ceux du répertoire "public" et sont fournis de manière statique par express.
Le site est pensé pour pouvoir fonctionner sans javascript, donc sans génération de pages à la volée par PUG. Le seul script de ce répertoire est index.js, il sert à gérer le burger menu pour la version mobile (définie par la taille du navigateur uniquement).
Toutes les autres pages sont du HTML/CSS pur et ne nécessitent pas JS.

## Backend

Le backend prend de l'importance pour la mise à jour du site par le webmaster.

Il fonctionne sur le principe des tutoriels Express de MDN et d'OpenClassrooms (en gros), avec Express et les vues PUG, ainsi qu'une base de données MongoDB.
Dans cette nouvelle version, on s'approche de la version opérationnelle. Au moyen d'un formulaire actuellement caché à l'URL "[localhost]/movie/form", on peut renseigner les propriétés d'un film (id TMDB via l'API, horaires des séances...).

## Notes

Le chat oublie des infos à certains endroits, obfuscat ne chasse pas le contenu des PUG notamment, mais rien n'est secret !

J'essaye de spécifier en HTML les champs width et height des images, comme recommandé dans l'articile suivant :
https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/
Pour le fichier movie.pug, je ne veux pas demander à l'utilisateur d'entrer ces champs, et je n'ai pas encore regardé comment les récupérer automatiquement, ainsi je mets par défaut les valeurs 150 et 200. Ce sera à améliorer.

La gestion des erreurs sera à approfondir plus tard, c'est très brouillon actuellement.

Un gros refactor du code sera nécessaire, je code ce site en "speedrun" pour avoir quelque chose de fonctionnel et on fera du rangement et du commentaire ensuite. Pour l'instant, trop d'apprentissage, trop de nouveaux concepts à chaque itération pour que je commence à tout bien structurer.

Des fichiers seront à supprimer, après refonte de refonte du code, du ménage est à faire. Je m'en occuperai dès que j'aurai une version viable.

## Architecture

Point d'entrée : server.js
