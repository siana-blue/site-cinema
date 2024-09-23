const express = require("express");
const router = express.Router();

const movies_controller = require("../controllers/moviesController");

/*
 * URL /movies/form
 * GET :
 * @param id (optionnel) : l'id MongoDB du film à afficher
 *
 * POST :
 * @param movie : la structure de données du film à afficher, au format JSON
 * @param isFromDB (optionnel) : si vrai, indique que la structure movie a été
 * chargée depuis MongoDB (document déjà existant)
 *
 * GENERAL
 * Retourne un formulaire au format HTML, éventuellement prérempli par un film
 * récupéré sur la BDD si un id est fouri en paramètre (GET) ou un movie (POST).
 *
 * Le formulaire PUG retourné interprète une structure de données movie,
 * si fournie, qui est un document MongoDB.
 * Une variable bool isFromDB est utilisée par le formulaire pour indiquer
 * si le movie fourni est un document déjà existant dans la BDD. Cela évite
 * une requête dans la BDD pour savoir si c'est le cas à partir de l'id du
 * movie.
 *
 * Le formulaire retourné affiche une prévisualisation de l'objet movie s'il
 * était prérempli. Il propose deux boutons :
 * - prévisualisation : recharge le même formulaire (même route avec la méthode
 * POST et la structure de données en paramètre, en conservant isFromDB). Un
 * objet Movie est créé avec la fonction makeObj de "db.js" afin de bénéficier
 * des champs virtuels nécessaires à la prévisualisation (URL de l'affiche).
 * - enregistrer : émet une requête POST vers l'URL /db/movie pour enregistrer
 * le movie dans la BDD. Si isFromDB est vrai, le movie sera cherché dans la BDD
 * avant d'être modifié pour correspondre à la structure du formulaire, puis
 * sauvegardé par "save" donc mis à jour. Sinon, l'objet est créé selon le Model
 * par la fonction makeObj de "db.js".
 */
router.get("/form", movies_controller.movie_form_get);
router.post("/form", movies_controller.movie_form_post);

/*
 * URL /movies/
 * GET :
 * Retourne une page HTML à partir d'un fichier PUG qui appelle lui-même
 * un script côté client pour afficher dynamiquement les films qui sont
 * requêtés sur la BDD en fonction des filtres sélectionnés.
 */
router.get("/", movies_controller.movie_list);

module.exports = router;
