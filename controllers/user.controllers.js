const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { transporter } = require("../helpers/nodemailer");

const {
  crearUsuarios,
  editarUsuarios,
  eliminarUsuario,
  buscarPorEmail,
  obtenerUsuarioPorNombre,
  obtenerTodosLosUsuarios,
  obtenerPorId
} = require("../services/user.services");

const getAllUser = async (req, res) => {
  try {
    const resp = await obtenerTodosLosUsuarios();
    if (!resp) {
      return res.render("errorPage",{msg: "No hay usuarios"});
    }
    res.render("tableUsers",{resp})
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;
    const resp = await obtenerUsuarioPorNombre(name);
    if (!resp) {
      res.status(404).json("no se encontro el usuario");
      return;
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getUserByMail = async (req, res) => {
  try {
    const { email } = req.body;
    const resp = await buscarPorEmail(email);
    if (!resp) {
      res.status(404).json("no se encontro el usuario");
      return;
    }
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createUser = async (req, res) => {
  const userData = req.body;
  console.log(userData);
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const saltRound = bcrypt.genSaltSync(10);

    const email = userData.email;
    userData.password = bcrypt.hashSync(userData.password, saltRound);
    const newUser = await crearUsuarios(userData);

    const mailOptions = {
      from: process.env.EMAIL_USER, // Tu dirección de correo
      to: email, // Dirección del destinatario
      subject: "Bienvenido a polaris 3D",
      text: `Bienvenido ${userData.name} nuestra página de eccomerce, atte equipo de desarrollo`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo:", error);
        res.send("Error al enviar el correo");
      }
    });

    res.status(201).json({
      msg: "Te registraste exitosamente, ya puedes iniciar sesión!👋",
      newUser,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    if(userData.disabled=="on"){
      userData.disabled=true
    }
    if(!userData.disabled){
      userData.disabled=false
    }

    if(userData.isAdmin=="on"){
      userData.isAdmin=true
    }
    if(!userData.isAdmin){
      userData.isAdmin=false
    }

    const resp = await editarUsuarios(id, userData);

    if (!resp)
    return res.render("errorPage",{msg: "Ups.. algo fallo, intentelo más tarde"});

    res.redirect("/user/get-all-user");
  } catch (error) {
    res.render("errorPage",{msg: error.message});
  }
};

const renderEditUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const resp = await obtenerPorId(id);
    if (!resp)
      return res.render("errorPage",{msg: "Ups.. algo fallo, intentelo más tarde"});
    res.render("editUser",{resp });
  } catch (error) {
    res.render("errorPage",{msg: error.message});
  }
};



const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await eliminarUsuario(id);
    if (!resp) {
      res.render("errorPage",{mgs:"no se encontro el usuario"});
      return;
    }
    res.redirect("/user/get-all-user")
  } catch (error) {
    res.render("errorPage",{msg: error.message});
  }
};

module.exports = {
  getUserByName,
  createUser,
  editUser,
  deleteUser,
  getAllUser,
  renderEditUser
};
