const moviePopulateStr = "director actors genre";

/*
 * Crée un objet sans passer par une requête MongoDB,
 * mais en utilisant un schéma et en réalisant le populate nécessaire
 * si précisé en paramètre
 */
exports.makeObj = async (obj, data, usePopulate = true) => {
  switch (obj) {
    case "movie":
      const Movie = require("./models/movie");
      data.actors_id = data.actors_id_hid.split(";");
      const movie = new Movie({
        title: data.title,
        director: data.director_id,
        rating: data.rating,
        actors: data.actors_id,
        length: data.length,
        genre: data.genre_id,
      });
      if (usePopulate) await movie.populate(moviePopulateStr);
      return movie;
    default:
      throw new Error("Invalid request: unknown model.");
  }
};

exports.dbGetObjById = async (obj, id) => {
  const Model = require("./models/" + obj);
  let qry = Model.findOne({ _id: id });
  switch (obj) {
    case "movie":
      qry.populate(moviePopulateStr);
      break;
    default:
      break;
  }

  const o = await qry;
  return o;
};

/*
 * Retourne un tableau d'objets correspondant à une requête vers
 * la base de données MongoDB.
 *
 * @param obj: la classe des objets à récupérer
 * @param options: les options de filtres
 *
 * options est de la forme :
 * {limit: <nombre>, sort: <nom d'un membre de la classe de l'objet>}
 * Chaque champ peut être omis si la recherche ne le requiert pas.
 * Typiquement, envoyer "req.query" ou {sort: "name", limit: 5}...
 *
 * Les options peuvent être les suivantes :
 * - limit : limite le nombre de résultats
 * - sort : tri sur le champ spécifié, cette fonction décide alors si
 * le tri est croissant ou décroissant
 */
exports.dbGetObjs = async (obj, options) => {
  const Model = require("./models/" + obj);
  let qry = Model.find();
  switch (obj) {
    case "movie":
      qry.populate(moviePopulateStr);
      break;
    default:
      break;
  }

  // Application des paramètres pour tri et filtres
  if (options.limit) {
    qry.limit(options.limit);
  }
  if (options.sort) {
    let order = "asc";
    switch (options.sort) {
      case "rating":
        order = "desc";
        break;
    }
    qry.sort({ [options.sort]: order }).collation({ locale: "fr" });
  }

  // Exécution de la requête
  const objs = await qry;
  return objs;
};

exports.dbSaveObj = async (obj, data) => {
  switch (obj) {
    case "movie":
      const Movie = require("./models/movie");
      const movie = new Movie(data);
      await movie.save();
      break;
    case "genre":
      const Genre = require("./models/genre");
      const genre = new Genre(data);
      await genre.save();
      break;
    case "person":
      const Person = require("./models/person");
      const person = new Person(data);
      await person.save();
      break;
    default:
      throw new Error("Invalid request: unknown model.");
  }
};
