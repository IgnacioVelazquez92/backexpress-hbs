const { Router } = require("express");
const route = Router();
const { body } = require("express-validator");
const {
  getUserByName,
  createUser,
  editUser,
  deleteUser,
  getAllUser,
  renderEditUser
} = require("../controllers/user.controllers");
const { emailValidation } = require("../helpers/user.validations");
const { jwtvalidator } = require("../middleware/jwtValidation");

route.get("/get-by-name/:name", getUserByName);
route.get("/get-all-user", getAllUser);

route.post(
  "/create-user",
  body("email")
    .isEmail()
    .withMessage("El formato de email es incorrecto")
    .not()
    .isEmpty()
    .withMessage("el campo email no puede estar vacio")
    .custom(emailValidation),
  body("password")
    .matches(/^[A-Za-z0-9]{8,16}$/)
    .withMessage("La contraseña no cumple con los requisitos"),
  body("name")
    .not()
    .isEmpty()
    .withMessage("el campo name no puede estar vacio")
    .isAlpha()
    .withMessage("no puede tener números el nombre")
    .trim(),
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("el campo lastName no puede estar vacio")
    .isAlpha()
    .withMessage("no puede tener números el el apellido")
    .trim(),
  createUser
);

route.post(
  "/edit-user/:id",
  jwtvalidator,
  body("email")
    .isEmail()
    .withMessage("El formato de email es incorrecto")
    .not()
    .isEmpty()
    .withMessage("el campo email no puede estar vacio")
    .custom(emailValidation),
  body("name")
    .not()
    .isEmpty()
    .withMessage("el campo name no puede estar vacio")
    .isAlpha()
    .withMessage("no puede tener números el nombre")
    .trim(),
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("el campo lastName no puede estar vacio")
    .isAlpha()
    .withMessage("no puede tener números el el apellido")
    .trim(),
  editUser
);


route.get(
  "/edit-user/:id",renderEditUser
);


route.get("/delete-user/:id",
jwtvalidator,
deleteUser);

route.get("/iniciar-sesion", (req, res) => {
  res.render("registro", {
    title: "registro",
  });
});




module.exports = route;
