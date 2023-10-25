const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const hbs = require("hbs");
const path = require("path");

//requiriendo las rutas
const userRoutes = require("../routes/user.routes");
const loginAuth = require("../routes/login.routes");

const PORT = process.env.PORT;

//conexión a la db
require("../dataBase/dbConnection");

//Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

//Configuración del motor de plantilla
app.set("view engine", "hbs");

//set del path de las vistas
app.set("views", path.join(__dirname, "../views"));

//set del path de los parciales
hbs.registerPartials(path.join(__dirname, "../views/partials"));

//Rutas
app.use("/user", userRoutes);
app.use("/login", loginAuth);

// Rutas para get
app.get("/", (req, res) => {
  res.render("index", {
    title: "Polaris-3D",
  });
});

app.get("/iniciar-sesion", (req, res) => {
  res.render("registro", {
    title: "registro",
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    title: "iniciar sesion",
  });
});

app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});
