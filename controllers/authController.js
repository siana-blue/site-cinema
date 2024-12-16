exports.login_form = async (req, res, next) => {
  res.status(200).render("login", {
    scripts: ["auth"],
  });
};

exports.check_auth = async (req, res, next) => {
  const jwt = require("jsonwebtoken");

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

exports.middle_auth = async (req, res, next) => {
  const jwt = require("jsonwebtoken");

  try {
    jwt.verify(req.cookies.jwtToken, process.env.AUTH_JWT_SECRET);
    return next();
  } catch (err) {
    res.status(403).redirect("/auth");
  }
};
