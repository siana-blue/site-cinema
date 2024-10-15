const { movieTags, movieVersions } = require("../var");
const Movie = require("../models/movie");

exports.movie_list = async (req, res, next) => {
  res.status(200).render("movie-list");
};

exports.movie_form_get = async (req, res, next) => {
  res.status(200).render("movie-form", {
    versions: movieVersions,
    tags: movieTags,
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
  movie = new Movie(data);
  try {
    await movie.save();
    res.status(200).redirect("/movies/form");
  } catch (err) {
    next(err);
  }
};
