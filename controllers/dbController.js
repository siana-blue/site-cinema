const { body, validationResult } = require("express-validator");
const { dbGetObjs, dbSaveObj, makeObj } = require("../db");

exports.db_obj_get = async (req, res, next) => {
  const objs = await dbGetObjs(req.params.obj, req.query);
  switch (req.params.obj) {
    case "movie":
      res
        .status(200)
        .render("movie-list-element", { movies: objs, edit: true });
      break;
    default:
      res.status(404).json({ message: "No template for this object." });
  }
};

exports.db_obj_store = [
  async (req, res, next) => {
    switch (req.params.obj) {
      case "movie":
        body("title")
          .trim()
          .isLength({ min: 1 })
          .withMessage("Le champ titre est obligatoire.")
          .isAlphanumeric("fr-FR", { ignore: " -'" })
          .withMessage("Le champ titre contient des caractères non autorisés.")
          .escape();
        body("rating")
          .trim()
          .isInt({ min: 1, max: 5 })
          .withMessage("La note doit être comprise entre 1 et 5");
        body("length").trim().escape();
        break;
      default:
        body("name")
          .trim()
          .isLength({ min: 1 })
          .escape()
          .withMessage("Le champ nom est obligatoire.")
          .isAlphanumeric("fr-FR", { ignore: " -" })
          .withMessage("Le champ nom contient des caractères non autorisés.");
        body("url").trim();
    }
    next();
  },

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).render("err", { errors: errors.array() });
    }

    let data;
    switch (req.params.obj) {
      case "movie":
        data = await makeObj("movie", req.body, false);
        break;
      default:
        data = {
          name: req.body.name,
          url: req.body.url,
        };
    }
    try {
      await dbSaveObj(req.params.obj, data);
    } catch (err) {
      return next(err);
    }

    res.status(200).redirect("/movies/form");
  },
];
