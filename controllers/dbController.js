const { body, validationResult } = require("express-validator");
const {
  dbGetObjs,
  dbSaveObj,
  makeObj,
  dbGetObjById,
  updateObj,
} = require("../db");

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
          .withMessage("Le champ titre contient des caractères non autorisés.");
        body("rating")
          .trim()
          .isInt({ min: 1, max: 5 })
          .withMessage("La note doit être comprise entre 1 et 5");
        body("length").trim().escape();
        body("synopsis")
          .trim()
          .isAlphanumeric("fr-FR", { ignore: " -'" })
          .withMessage(
            "Le champ synopsis contient des caractères non autorisés."
          );
        break;
      default:
        body("name")
          .trim()
          .isLength({ min: 1 })
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

    let doc;
    if (req.body.isFromDB) {
      const Model = require("../models/" + req.params.obj);
      doc = await dbGetObjById(req.params.obj, req.body.id);
      await updateObj(req.params.obj, doc, req.body);
    } else {
      doc = await makeObj(req.params.obj, req.body);
    }

    try {
      await dbSaveObj(doc);
    } catch (err) {
      return next(err);
    }

    res.status(200).redirect("/movies/form");
  },
];
