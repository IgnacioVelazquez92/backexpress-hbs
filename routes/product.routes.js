const { Router } = require("express");
const route = Router();
const {
  getAllProducts,
  getProductById,
  createProducts,
  editProducts,
  deleteProducts,
  getproductByName,
  renderEditProduct,
} = require("../controllers/product.controller");

route.get("/", getAllProducts);

route.get("/get-by-product/:nombre", getproductByName);

route.get("/get-by-id/:id", getProductById);

route.post("/create-products", createProducts);
route.get("/add", (req, res) => {
  const logueado = req.session;
  console.log(logueado);

  res.render("addProducts", {
    title: "Añadir Producto",
  });
});

route.post("/edit-products/:id", editProducts);
route.get("/edit-products/:id", renderEditProduct);

route.delete("/delete-products/:id", deleteProducts);

module.exports = route;
