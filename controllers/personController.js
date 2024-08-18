const { body, validationResult } = require("express-validator");
const Person = require("../models/person");

exports.person_db_get = async (req, res, next) => {
  const persons = await Person.find().exec();

  res.status(200).json(persons);
};

exports.person_db_store = [
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

    const person = new Person({
      name: req.body.name,
      url: req.body.url,
    });
    await person.save();
    res.status(200).redirect("/movie/form");
  },
];
