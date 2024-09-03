const { body, validationResult } = require("express-validator");
const Genre = require("../models/genre");

exports.genre_db_get = async (req, res, next) => {
  const genres = await Genre.find().exec();

  res.status(200).json(genres);
};

exports.genre_db_store = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Le champ nom est obligatoire.")
    .isAlphanumeric("fr-FR", { ignore: " -" })
    .withMessage("Le champ nom contient des caractères non autorisés."),
  body("url").trim(),

  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).render("err", { errors: errors.array() });
    }

    const genre = new Genre({
      name: req.body.name,
      url: req.body.url,
    });
    await genre.save();
    res.status(200).redirect("/movie/form");
  },
];
