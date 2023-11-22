const jwt = require("jsonwebtoken");

const jwtvalidator = async (req, res, next) => {
  try {
    const user = req.session.userData;
    const token = user.token

    if (!token) return res.render("errorPage",{msg: "No cuenta con los permisos necesarios"});;
    jwt.verify(token, process.env.SECRET, (error) => {
      if (error) return res.render("errorPage",{msg: "No cuenta con los permisos necesarios"});
      next();
    });
    // next()
  } catch (error) {
    res.render("errorPage",{msg: "Ups.. algo fallo, intentelo más tarde"});
  }
};

module.exports = {
  jwtvalidator,
};
