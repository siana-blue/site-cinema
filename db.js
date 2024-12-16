// Méthodes d'interface avec MongoDB ou TMDB

/*
 * Retourne un objet MovieDB pour interface avec TMDB
 */
async function movieDB() {
  const { readFile } = require("fs/promises");

  const { MovieDb } = require("moviedb-promise");

  return new MovieDb(process.env.TMDB_AUTH);
}

/*
 * Retourne la liste des ID TMDB à partir d'un mot-clé de recherche
 */

exports.tmdbIDSearch = async function (title) {
  const moviedb = await movieDB();

  const mov = await moviedb.searchMovie({
    query: title,
    language: "fr",
  });
  let movieIds = [];
  mov.results.forEach((result) => movieIds.push(result.id));
  return movieIds;
};

/*
 * Retourne un objet 'movie' selon la structure suivante, à partir d'un
 * ID de TMDB.
 *
 * {
 *  movie.title,
 *  movie.overview,
 *  movie.poster_path,
 *  movie.rating,
 *  movie.runtime,
 *  movie.actors[](name, url),
 *  movie.director[](name, url)
 * }
 */

exports.tmdbIDMovie = async function (tmdbID) {
  const moviedb = await movieDB();

  let movie = {};
  const mov = await moviedb.movieInfo({
    id: tmdbID,
    language: "fr",
    append_to_response: "credits",
  });
  movie.title = mov.title;
  movie.overview = mov.overview;
  movie.poster_path = "https://image.tmdb.org/t/p/original/" + mov.poster_path;
  movie.rating = mov.vote_average;
  movie.runtime = mov.runtime;
  if (mov.genres.length > 0) movie.genre = mov.genres[0].name;

  movie.actors = [];
  mov.credits.cast.sort(function (a, b) {
    return a.order - b.order;
  });
  mov.credits.cast = mov.credits.cast.slice(0, 3);
  mov.credits.cast.forEach((person) => {
    movie.actors.push({
      name: person.name,
      url: "https://image.tmdb.org/t/p/original/" + person.profile_path,
    });
  });
  mov.credits.crew.forEach((person) => {
    if (person.job === "Director") {
      movie.director = {
        name: person.name,
        url: "https://image.tmdb.org/t/p/original/" + person.profile_path,
      };
    }
  });

  return movie;
};

/*
 * Retourne la liste des films dont au moins une séances est comprise
 * entre deux dates (depuis MongoDB).
 *
 * Un tri est possible sur les tags passés en premier agument (tableau).
 */
exports.movieSessions = async function (tags, minDate, maxDate) {
  const Movie = require("./models/movie");
  minDate.setUTCHours(0);
  minDate.setUTCMinutes(0);
  minDate.setUTCSeconds(0);
  minDate.setUTCMilliseconds(0);
  const movieReq = Movie.find().elemMatch("sessions", {
    $and: [{ date: { $gte: minDate } }, { date: { $lte: maxDate } }],
  });
  if (tags.length > 0) movieReq.where({ tags: { $all: tags } });
  // lean to have JSON and be able to edit it later
  const movies = await movieReq.lean().exec();

  return movies;
};

/*
 * Retourne le film correspondant à l'ID passé en paramètre.
 * L'objet au format JSON ne contient que les données de MongoDB,
 * sans ajout issu de l'API TMDB.
 */
exports.localMovie = async function (tmdbid) {
  const Movie = require("./models/movie");
  const movie = await Movie.findOne({ tmdb_id: tmdbid }).exec();

  return movie;
};

exports.checkUserCredentials = async function (login, password) {
  const User = require("./models/user");
  const user = await User.findOne({ login: login }).exec();

  if (!user) return false;
  return user.password === password;
};
