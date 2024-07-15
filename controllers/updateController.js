const fs = require("fs");

exports.update_form_get = (req, res) => {
  res.status(200).render("form", {
    title: "Modification du titre de la page",
    pages: [
      "index",
      "programmation",
      "cine-memoire",
      "jeune-public",
      "infos-pratiques",
    ],
    theme: "",
    layout: "",
  });
};

exports.update_form_post = (req, res) => {
  if (req.body.title && req.body.page) {
    const layout = req.body.page === "index" ? "layout-accueil" : "";

    res.render(
      req.body.page,
      {
        title: req.body.title,
        layout: layout,
      },
      function (err, html) {
        for (let e in err) {
          // for loop to check whether err is empty or not
          res.status(500).json({ error: err });
          return;
        }

        fs.promises
          .writeFile("./public/" + req.body.page + "_temp.html", html)
          .then(res.status(200).redirect("./" + req.body.page + "_temp.html"))
          .catch(
            res.status(500).json({
              message: "Unable to write temp file",
            })
          );
      }
    );
  } else {
    res.status(400).render("err", {
      error: "Bad request in update form: title or selected page",
    });
  }
};
