const express = require("express");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const cors = require("cors");
const { engine } = require("express-handlebars");
const path = require("path");
const sessionMiddleware = require("../middleware/session");

//requiriendo las rutas
const userRoutes = require("../routes/user.routes");
const loginAuth = require("../routes/login.routes");
const productsRoutes = require("../routes/product.routes");

const PORT = process.env.PORT;

//conexión a la db
require("../dataBase/dbConnection");

//Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleware);

//Configuración del motor de plantilla
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
  })
);
app.set("view engine", ".hbs");

// set del path de las vistas
app.set("views", path.join(__dirname, "../views"));

//Rutas
app.use("/user", userRoutes);
app.use("/login", loginAuth);
app.use("/products", productsRoutes);

// Rutas para get
app.get("/", (req, res) => {
  res.render("index", {
    title: "Polaris 3D",
  });
});

app.listen(PORT, () => {
  console.log(`servidor corriendo en http://localhost:${PORT}`);
});
