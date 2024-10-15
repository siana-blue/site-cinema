exports.info_get = async (req, res, next) => {
  switch (req.params.obj) {
    case "movie":
      const { readFile } = require("fs/promises");
      const { moviedbFile } = require("../var");
      const apikey = await readFile("./" + moviedbFile, { encoding: "utf8" });

      const { MovieDb } = require("moviedb-promise");
      const moviedb = new MovieDb(apikey);

      if (req.query.title) {
        moviedb
          .searchMovie({ query: req.query.title, language: "fr" })
          .then((mov) => {
            /*
            let promises = [];
            mov.results.forEach((result) => {
              promises.push(
                moviedb
                  .movieCredits(result.id)
                  .then((data) => (result.credits = data))
              );
            });
            Promise.all(promises).then((values) => {
              for (let i = 0; i < values.length; i++) {
                mov.results[i].credits = values[i];
                values[i].crew.forEach((person) => {
                  if (person.job === "Director")
                    mov.results[i].director = {
                      name: person.name,
                      url:
                        "https://image.tmdb.org/t/p/original/" +
                        person.profile_path,
                    };
                });
              }
              res.status(200).json(mov);
            });
            */

            let movieIds = [];
            mov.results.forEach((result) => movieIds.push(result.id));
            res.status(200).json(movieIds);
          });
      } else if (req.query.id) {
        let movie = {};
        const mov = await moviedb.movieInfo({
          id: req.query.id,
          language: "fr",
          append_to_response: "credits",
        });
        movie.title = mov.title;
        movie.overview = mov.overview;
        movie.poster_path =
          "https://image.tmdb.org/t/p/original/" + mov.poster_path;
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
