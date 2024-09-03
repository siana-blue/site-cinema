const { body, validationResult } = require("express-validator");
const Movie = require("../models/movie");
const Person = require("../models/person");
const Genre = require("../models/genre");

const fs = require("fs");

exports.movie_list = async (req, res, next) => {
  try {
    const allMovies = await Movie.find().populate("director").exec();
    res.status(200).render("movie-list", { movie_list: allMovies });
  } catch (err) {
    next(err);
  }
};

exports.movie_form_get = async (req, res, next) => {
  const allPersons = await Person.find()
    .sort({ name: 1 })
    .collation({ locale: "fr" })
    .exec();
  const allGenres = await Genre.find()
    .sort({ name: 1 })
    .collation({ locale: "fr" })
    .exec();
  res
    .status(200)
    .render("movie-form", { persons: allPersons, genres: allGenres });
};

exports.movie_preview = async (req, res, next) => {
  const allPersons = await Person.find()
    .sort({ name: 1 })
    .collation({ locale: "fr" })
    .exec();
  const allGenres = await Genre.find()
    .sort({ name: 1 })
    .collation({ locale: "fr" })
    .exec();

  let movie;
  if (req.body.movie_id) {
    movie = await Movie.findOne({ _id: req.body.movie_id }).exec();
  } else {
    req.body.actors_id = req.body.actors_id_hid.split(";");

    movie = new Movie({
      title: req.body.title,
      director: req.body.director_id,
      rating: req.body.rating,
      actors: req.body.actors_id,
      length: req.body.length,
      genre: req.body.genre_id,
    });
  }
  await movie.populate("director actors genre");

  res.status(200).render("movie-form", {
    preview: true,
    movie: movie,
    persons: allPersons,
    genres: allGenres,
  });
};

exports.movie_db_get = async (req, res, next) => {
  try {
    let qry = Movie.find();
    if (req.query.limit) {
      qry.limit(req.query.limit);
    }
    if (req.query.sort) {
      order = "asc";
      switch (req.query.sort) {
        case "rating":
          order = "desc";
          break;
      }
      qry.sort({ [req.query.sort]: order });
    }
    const movies = await qry.populate("director actors").exec();

    res
      .status(200)
      .render("movie-list-element", { movies: movies, edit: true });
  } catch (err) {
    next(err);
  }
};

exports.movie_db_store = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Le champ titre est obligatoire.")
    .isAlphanumeric("fr-FR", { ignore: " -'" })
    .withMessage("Le champ titre contient des caractères non autorisés.")
    .escape(),
  body("rating")
    .trim()
    .isInt({ min: 1, max: 5 })
    .withMessage("La note doit être comprise entre 1 et 5"),
  body("length").trim().escape(),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(500).render("err", { errors: errors.array() });
      }

      req.body.actors_id = req.body.actors_id_hid.split(";");
      const movie = new Movie({
        title: req.body.title,
        director: req.body.director_id,
        rating: req.body.rating,
        actors: req.body.actors_id,
        length: req.body.length,
        genre: req.body.genre_id,
      });
      await movie.save();

      res.redirect("/movie/form");
    } catch (err) {
      next(err);
    }
  },
];
