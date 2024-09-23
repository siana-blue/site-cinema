const moviePopulateStr = "director actors genre";

/*
 * Crée un objet sans passer par une requête MongoDB,
 * mais en utilisant un schéma et en réalisant le populate nécessaire
 * si précisé en paramètre
 */
exports.makeObj = async (obj, data) => {
  switch (obj) {
    case "movie":
      const Movie = require("./models/movie");

      const movie = new Movie({
        _id: data.id,
        title: data.title,
        director: data.director_id,
        rating: data.rating,
        actors: data.actors_id_hid.split(";"),
        length: data.length,
        genre: data.genre_id,
        synopsis: data.synopsis,
      });
      await movie.populate(moviePopulateStr);
      return movie;
    case "genre":
    case "person":
      const Model = require("./models/" + obj);
      const model = new Model({
        name: data.name,
        url: data.url,
      });
      return model;
    default:
      throw new Error("Invalid request: unknown model.");
  }
};
exports.updateObj = async (obj, doc, data) => {
  switch (obj) {
    case "movie":
      doc.title = data.title;
      doc.director = data.director_id;
      doc.rating = data.rating;
      doc.actors = data.actors_id_hid.split(";");
      doc.length = data.length;
      doc.genre = data.genre_id;
      doc.synopsis = data.synopsis;
      break;
    case "genre":
    case "person":
      doc.name = data.name;
      doc.url = data.url;
      break;
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

exports.dbSaveObj = async (data) => {
  await data.save();
};
