const { body, validationResult } = require("express-validator");
const { dbGetObjs, dbGetObjById, makeObj } = require("../db");

const fs = require("fs");

exports.movie_list = async (req, res, next) => {
  res.status(200).render("movie-list");
};

exports.movie_form_get = async (req, res, next) => {
  const allPersons = await dbGetObjs("person", { sort: "name" });
  const allGenres = await dbGetObjs("genre", { sort: "name" });

  const movie = req.query.id
    ? await dbGetObjById("movie", req.query.id)
    : undefined;

  res.status(200).render("movie-form", {
    movie: movie,
    isFromDB: movie ? true : false,
    persons: allPersons,
    genres: allGenres,
  });
};

exports.movie_form_post = async (req, res, next) => {
  const allPersons = await dbGetObjs("person", { sort: "name" });
  const allGenres = await dbGetObjs("genre", { sort: "name" });

  const movie = await makeObj("movie", req.body);

  res.status(200).render("movie-form", {
    movie: movie,
    isFromDB: req.body.isFromDB,
    persons: allPersons,
    genres: allGenres,
  });
};
