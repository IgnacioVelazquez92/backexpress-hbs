const { Router } = require("express");
const route = Router();

const { login } = require("../controllers/login.controllers");

route.post("/", login);

route.get("/", (req, res) => {
  res.render("login", {
    title: "iniciar sesion",
  });
});

module.exports = route;
