exports.info_get = async (req, res, next) => {
  switch (req.params.obj) {
    case "movie":
      const { tmdbIDSearch, tmdbIDMovie } = require("../db");

      if (req.query.title) {
        const movieIds = await tmdbIDSearch(req.query.title);
        res.status(200).json(movieIds);
      } else if (req.query.id) {
        const movie = await tmdbIDMovie(req.query.id);
        res.status(200).json(movie);
      } else
        next(
          new Error({
            message: "Movie info query needs to specify id or title keywords.",
          })
        );
      break;
  }
};

exports.info_render = async (req, res, next) => {
  switch (req.params.obj) {
    case "movie":
      res.status(200).render("movie", {
        movie: req.body.movie,
      });
      break;
  }
};
