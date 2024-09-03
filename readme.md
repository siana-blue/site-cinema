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
Dans cette nouvelle version, on s'approche de la version opérationnelle. Au moyen d'un formulaire actuellement caché à l'URL "[localhost]/movie/form", on peut renseigner les propriétés d'un film.
Avec le bouton prévisualiser, l'affiche et les caractéristiques du film apparaissent sous le formulaire comme ils apparaîtront dans les sections "à l'affiche". Ensuite, un bouton apparaît alors pour ajouter le film à la base de données MongoDB. L'utilisateur est alors redirigé vers la page d'accueil.

A termes, il sera amené vers une page d'administration où tous les films de la base de données seront listés, et où l'administrateur pourra choisir ceux à afficher et à quelles dates.

Je supprime l'explication du workflow que j'avais en tête, car il faut que je repense tout.
Je code un peu au fil de l'eau jusqu'à maintenant, pour appliquer les concepts appris. Il faut dorénavant que je trace un schéma clair de mon site et de comment je veux qu'il fonctionne.

## Notes

Le chat oublie des infos à certains endroits, obfuscat ne chasse pas le contenu des PUG notamment, mais rien n'est secret !

J'essaye de spécifier en HTML les champs width et height des images, comme recommandé dans l'articile suivant :
https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/
Pour le fichier movie.pug, je ne veux pas demander à l'utilisateur d'entrer ces champs, et je n'ai pas encore regardé comment les récupérer automatiquement, ainsi je mets par défaut les valeurs 150 et 200. Ce sera à améliorer.

La gestion des erreurs sera à approfondir plus tard, c'est très brouillon actuellement.

Pour la validation des champs renseignés lors de l'ajout d'un film, il faudrait le faire dès la preview.

Il faudra penser à enlever la référence à l'URL localhost notamment dans le script client "movies_list.js"

Les champs escape, notamment le titre des films, génèrent des codes HTML dans la base de données : .replace("&#x27;", "'") est donc parfois utilisé un peu partout lors de la lecture des données, il faudrait centraliser cette gestion.

Pour le formulaire movie-form.pug, certains champs (actors) reçoivent des données d'un input hidden, donc une String, qu'il faut convertir en tableau pour avoir un format de données adéquat pour son traitement ensuite. Cela fait du code répétitif. J'aurai voulu convertir cela en front end avant envoi au back end, en gérant le submit event en front end avant d'envoyer un formulaire dont les données (FormData) sont modifiées, au backend. Je n'y arrive pas ! Ce sera à travailler. (voir méthode "hidden" et le script public/scripts/movie_form.js)

Un gros refactor du code sera nécessaire, je code ce site en "speedrun" pour avoir quelque chose de fonctionnel et on fera du rangement et du commentaire ensuite. Pour l'instant, trop d'apprentissage, trop de nouveaux concepts à chaque itération pour que je commence à tout bien structurer.

## Last Commit

Ajout d'un formulaire pour ajouter des objets Genre à la base de données, sur exactement la même architecture que Person.
Le prochain Commit sera le début d'un refactor du code (je ne sais pas si j'utilise bien ce terme encore).
Trop de répétitions, trop brouillon, je vais commencer à repenser toute l'architecture du machin.
