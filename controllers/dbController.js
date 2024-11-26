exports.get_tmdbID = async (req, res, next) => {
  const { tmdbIDSearch } = require("../db");

  if (!req.query.title) {
    next(
      new Error({
        message: "Movie ID query needs to specify title keywords.",
      })
    );
  }

  const movieIds = await tmdbIDSearch(req.query.title);
  res.status(200).json(movieIds);
};

exports.get_info = async (req, res, next) => {
  const { tmdbIDMovie } = require("../db");

  if (!req.query.id) {
    next(
      new Error({
        message: "Movie info query needs to specify TMDB id",
      })
    );
  }

  const movie = await tmdbIDMovie(req.query.id);
  res.render("movie", { movie }, function (err, html) {
    if (err) next(err);

    res.status(200).json({ data: movie, html: html });
  });
};

exports.get_movies = async (req, res, next) => {
  const { dateFromText } = require("../utils");
  const { movieSessions, tmdbIDMovie } = require("../db");

  const startDate = dateFromText(req.query.start_date) ?? new Date(0);
  const endDate =
    dateFromText(req.query.end_date) ?? new Date(2050, 11, 31, 0, 0, 0, 0);

  let tags = req.query.filter ? req.query.filter.split(" ") : [];
  tags = tags.map((tag) => tag.replaceAll("_", " "));
  let movies = await movieSessions(tags, startDate, endDate);
  for (let i = 0; i < movies.length; i++) {
    movies[i].tmdb = await tmdbIDMovie(movies[i].tmdb_id);
  }
  if (req.query.sort) {
    switch (req.query.sort) {
      case "title":
        movies.sort((a, b) =>
          a.tmdb.title > b.tmdb.title ? 1 : a.tmdb.title < b.tmdb.title ? -1 : 0
        );
        break;
      case "next_session":
        movies.sort((a, b) => {
          if (a.sessions.length === 0) return -1;
          if (b.sessions.length === 0) return 1;

          // Récupérer la séance la plus proche après startDate pour a et b
          let getFirstSession = function (m) {
            m.sessions.sort((s1, s2) =>
              s1.date > s2.date ? 1 : s1.date < s2.date ? -1 : 0
            );
            for (let s of m.sessions) {
              if (s.date >= startDate) {
                return s.date;
              }
            }
          };

          return getFirstSession(a) - getFirstSession(b);
        });
        break;
    }
  }
  res.render(
    "movie-list-element",
    { movies, edit: true },
    function (err, html) {
      if (err) next(err);

      res.status(200).json({ data: movies, html: html });
    }
  );
};
