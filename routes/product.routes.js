const { Router } = require("express");
const route = Router();
const {
  getAllProducts,
  createProducts,
  editProducts,
  deleteProducts,
  getproductByName,
  renderEditProduct,
} = require("../controllers/product.controller");

route.get("/", getAllProducts);

route.post("/get-by-product", getproductByName);


route.post("/create-products", createProducts);
route.get("/add", (req, res) => {
  const logueado = req.session;
  res.render("addProducts", {
    title: "Añadir Producto",
  });
});

route.get("/servicios", (req, res) => {
  const logueado = req.session;
  res.render("Servicios", {
    title: "Servicios",
  });
});

route.post("/edit-products/:id", editProducts);
route.get("/edit-products/:id", renderEditProduct);

route.get("/delete-products/:id", deleteProducts);

module.exports = route;
