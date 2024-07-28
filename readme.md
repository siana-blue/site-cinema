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

Il existe un formulaire actuellement caché, accessible par l'url "/form" depuis la racine du site (port 3000 local pour l'instant).
Ce formulaire sert à mettre à jour les pages du site, à termes il ne sera accessible que par les personnes autorisées.
Pour l'instant, il s'agit d'un test : l'administrateur ne peut que modifier le titre des pages.

Dans l'utilisation courante du site, tous les fichiers utiles sont ceux du répertoire "public" et sont fournis de manière statique par express.
Le site est pensé pour pouvoir fonctionner sans javascript, donc sans génération de pages à la volée par PUG. Le seul script de ce répertoire est index.js, il sert à gérer le burger menu pour la version mobile (définie par la taille du navigateur uniquement).
Toutes les autres pages sont du HTML/CSS pur et ne nécessitent pas JS.

## Backend

Le backend prend de l'importance pour la mise à jour du site par le webmaster.

Il fonctionne sur le principe des tutoriels Express de MDN et d'OpenClassrooms (en gros), avec Express et les vues PUG, ainsi qu'une base de données MongoDB (pas encore fait).
Pour l'instant dans ce commit initial, il s'agit d'une version test, seul le titre des pages peut être modifié.

A réception d'une requête POST depuis le formulaire situé à l'URL "/form/", un fichier HTML temporaire est créé au même emplacement que le fichier sélectionné (donc dans /public/), avec le suffixe "\_temp" ajouté au nom du fichier avant l'extension, prendant en compte la modification demandée dans le formulaire. La nouvelle page ainsi créée utilise les views PUG (c'est le seul moment où elles sont utilisées).

Pour le fonctionnement pérenne, il est prévu d'ajouter le workflow suivant :

- Renseignement du formulaire en précisant : la page concernée, les modifications à apporter parmi une sélection pré-établie (titre de la page, affiches des films, descriptions etc...)
- Création d'une page web temporaire avec le suffixe "\_temp", redirection vers cette page.
- Validation par l'administrateur dans un formulaire spécifique, pour appliquer définitivement les modifications : tous les fichiers "temp" remplacent les fichiers originaux.
- Peut-être prévoir un mode maintenance du site pour faire cela même si ce n'est pas long.

## Notes

Le chat oublie des infos à certains endroits, obfuscat ne chasse pas le contenu des PUG notamment, mais rien n'est secret !

J'essaye de spécifier en HTML les champs width et height des images, comme recommandé dans l'articile suivant :
https://www.smashingmagazine.com/2020/03/setting-height-width-images-important-again/
Pour le fichier movie.pug, je ne veux pas demander à l'utilisateur d'entrer ces champs, et je n'ai pas encore regardé comment les récupérer automatiquement, ainsi je mets par défaut les valeurs 150 et 200. Ce sera à améliorer.

La gestion des erreurs sera à approfondir plus tard, c'est très brouillon actuellement.

### Ajout depuis le dernier commit

- Connexion à une base MongoDB
- Ajout d'un formulaire de création de nouveau film dans la base de données (embryonnaire) - accessible via l'URL ([localhost]/movie)
- Route de gestion des erreurs (à approfondir)
- Suppression de la route "update" pour le formulaire test de modification du titre de la page
