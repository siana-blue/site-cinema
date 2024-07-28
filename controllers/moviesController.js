const { body, validationResult } = require("express-validator");
const Movie = require("../models/movie");

const fs = require("fs");
const movie = require("../models/movie");

exports.movie_form_get = (req, res, next) => {
  res.status(200).render("movie-form");
};

exports.movie_preview = (req, res, next) => {
  const movie = new Movie({
    title: req.body.title,
    director: req.body.director,
    rating: req.body.rating,
  });

  res.status(200).render("movie-form", {
    preview: true,
    movie: movie,
  });
};

// A compléter/corriger
exports.movie_db_store = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Le champ titre est obligatoire.")
    .isAlphanumeric("fr-FR", { ignore: " " })
    .withMessage("Le champ titre contient des caractères non autorisés."),
  body("director")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 100 })
    .escape()
    .withMessage("Le champ réalisateur est trop long (< 100 caractères)")
    .isAlphanumeric("fr-FR", { ignore: " " })
    .withMessage("Le champ réalisateur contient des caractères non autorisés."),
  body("rating")
    .trim()
    .isInt({ min: 1, max: 5 })
    .withMessage("La note doit être comprise entre 1 et 5"),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(500).render("err", { errors: errors.array() });
      }

      const movie = new Movie({
        title: req.body.title,
        director: req.body.director,
        rating: req.body.rating,
      });
      await movie.save();
      res.redirect("/index.html");
    } catch (err) {
      next(err);
    }
  },
];
