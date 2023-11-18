const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const searchMail = await User.findOne({ email });
    if (searchMail.disabled) {
      return res.status(401).json({
        msg: "Este correo se encuentra bloqueado, contacte al administrador",
      });
    }

    if (!searchMail)
      return res.status(401).json({ msg: "Usuario o contraseña incorrecto." });
    const match = bcrypt.compareSync(password, searchMail.password);
    if (!match)
      return res.status(401).json({ msg: "Usuario o contraseña incorrecto." });

    const payload = {
      id: searchMail.id,
      email: searchMail.email,
    };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });

    // Inicializa la sesión y guarda información en la sesión
    req.session.userData = {
      id: searchMail.id,
      name: searchMail.name,
      lastName: searchMail.lastName,
      email: searchMail.email,
      isAdmin: searchMail.isAdmin,
    };

    console.log(req.session.userData);
    return res.json({
      resp: {
        msg: "Ingresaste con éxito",
        token,
        userData: req.session.userData,
      },
    });
  } catch (error) {
    res.status(500).json({
      msg: "Fallo el servidor, inténtalo más tarde",
    });
  }
};

module.exports = {
  login,
};
