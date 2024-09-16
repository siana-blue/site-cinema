const { body, validationResult } = require("express-validator");
const { dbGetObjs, dbGetObjById, makeObj } = require("../db");

const fs = require("fs");

exports.movie_list = async (req, res, next) => {
  res.status(200).render("movie-list");
};

exports.movie_form_get = async (req, res, next) => {
  const allPersons = await dbGetObjs("person", { sort: "name" });
  const allGenres = await dbGetObjs("genre", { sort: "name" });
  res
    .status(200)
    .render("movie-form", { persons: allPersons, genres: allGenres });
};

exports.movie_preview = async (req, res, next) => {
  const allPersons = await dbGetObjs("person", { sort: "name" });
  const allGenres = await dbGetObjs("genre", { sort: "name" });

  let movie;
  if (req.body.movie_id) {
    movie = await dbGetObjById("movie", req.body.movie_id);
  } else {
    req.body.actors_id = req.body.actors_id_hid.split(";");
    movie = await makeObj("movie", req.body);
  }

  res.status(200).render("movie-form", {
    preview: true,
    movie: movie,
    persons: allPersons,
    genres: allGenres,
  });
};
