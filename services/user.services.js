const User = require("../models/user.model");

//Servicios a la base de datos:

const buscarPorEmail = async (email) => {
  return await User.findOne({ email });
};

const crearUsuarios = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};

const editarUsuarios = async (id, userData) => {
  return User.findByIdAndUpdate(id, userData);
};

const obtenerUsuarioPorNombre = async (name) => {
  const regex = new RegExp(name, "i");

  return await User.find({ name: { $regex: regex } });
};

const eliminarUsuario = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  crearUsuarios,
  editarUsuarios,
  eliminarUsuario,
  buscarPorEmail,
  obtenerUsuarioPorNombre,
};
