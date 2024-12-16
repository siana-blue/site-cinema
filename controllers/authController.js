exports.login_form = async (req, res, next) => {
  res.status(200).render("login", {
    scripts: ["auth"],
  });
};

exports.check_auth = async (req, res, next) => {
  const jwt = require("jsonwebtoken");

  /* if (req.query.jwt) {
    // connexion par jwt déjà présent
    // (si le client voit un jeton dans sa session il l'envoie
    // pour vérifier s'il est expiré ou non)
    jwt.verify(
      req.query.jwt,
      process.env.AUTH_JWT_SECRET,
      function (err, decoded) {
        if (err) {
          if (err.name === "TokenExpiredError")
            res.status(403).json("Expired token");
          else res.status(403).json("Invalid token");
        } else res.status(200).json("Connected!");
      }
    ); */
  //} else {
  // connexion par login/mdp
  const { login, password } = req.query;

  const authOK = await require("../db").checkUserCredentials(login, password);

  if (authOK) {
    const token = jwt.sign(
      {
        user: login,
      },
      process.env.AUTH_JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );
    res.header("Authorization", "Bearer " + token);
    res.status(200).json("Connected!");
  } else {
    res.status(403).json("Bad credentials");
  }
  //}
};
