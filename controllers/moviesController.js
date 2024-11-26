const { movieTags, movieVersions } = require("../var");
const Movie = require("../models/movie");
const movie = require("../models/movie");

exports.movie_list = async (req, res, next) => {
  res.status(200).render("movie-list");
};

exports.movie_form_get = async (req, res, next) => {
  res.status(200).render("movie-form", {
    versions: movieVersions, // var.js
    tags: movieTags, // var.js
  });
};

exports.movie_form_update = async (req, res, next) => {
  const { localMovie } = require("../db");
  let movie;
  try {
    movie = await localMovie(req.params.id);

    if (!movie)
      throw new Error(
        `Cannot find movie with ID ${req.params.id} in database.`
      );
  } catch (err) {
    err.status = 404;
    next(err);
  }

  let sessionList = "";
  for (let s of movie.sessions) {
    sessionList += sessionList ? ";" : "";
    sessionList +=
      s.date + "," + s.startingTime.replace("h", ":") + "," + s.room;
    if (s.version) sessionList += "," + s.version;
  }

  res.status(200).render("movie-form", {
    versions: movieVersions, // var.js
    tags: movieTags, // var.js
    tmdbid: req.params.id,
    checkedTags: movie.tags,
    sessionList: sessionList,
    _id: movie._id,
  });
};

exports.movie_form_post = async (req, res, next) => {
  const sessionStr = req.body.sessions.split(";");
  const sessions = [];

  sessionStr.forEach((str) => {
    const sessionComp = str.split(",");
    sessions.push({
      date: sessionComp[0],
      startingTime: sessionComp[1].replace(":", "h"),
      room: sessionComp[2],
      version: sessionComp.length > 3 ? sessionComp[3] : null,
    });
  });
  let data = {
    tmdb_id: req.body.movie_tmdb_id,
    sessions: sessions,
    tags: [],
  };
  for (let i = 0; i < movieTags.length; i++) {
    if (req.body["tag_" + i] === "on") data.tags.push(movieTags[i]);
  }
  try {
    if (req.body.mongodbID)
      await movie.replaceOne({ _id: req.body.mongodbID }, data);
    else {
      let movie = new Movie(data);
      await movie.save();
    }
    res.status(200).redirect("/movies/new");
  } catch (err) {
    next(err);
  }
};
