const Product = require("../models/product.models");
const {
  getAllProductService,
  getProductByIdService,
  createProductService,
  editProductService,
  deleteProductService,
  obtenerProductoPorNombre,
} = require("../services/product.services");

const getAllProducts = async (req, res) => {
  try {
    const user = req.session.userData;
    const resp = await getAllProductService();
    // console.log(resp);
    if (resp.lenght === 0)
      return res.status(404).json("No hay productos en la base de datos");
    res.render("index", { title: "Polaris 3D", resp, user: user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await getProductByIdService(id);
    if (!resp)
      return res
        .status(404)
        .json(`El producto con el id: ${id} no se ha encontrado`);
    res.status(200).json(resp);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createProducts = async (req, res) => {
  try {
    const productData = req.body;
    const resp = await createProductService(productData);
    res.redirect("/");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const editProducts = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("el id es :", id);
    const productData = req.body;
    console.log("los que llegan:", productData, "termina de mostrar");

    if(productData.inStock=="on"){
      productData.inStock=true
    }
    if(!productData.inStock){
      productData.inStock=false
    }
    console.log("los nuevos datos son:", productData, "termina de mostrar");

    console.log("el check viene como: " + productData.inStock);


    const resp = await editProductService(id, productData);
    if (!resp) return res.status(404).json("producto no encontrado");
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

const renderEditProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await getProductByIdService(id);
    // console.log(resp);
    if (!resp)
      return res
        .status(404)
        .json(`El producto con el id: ${id} no se ha encontrado`);
    res.render("editProduct", { resp });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await deleteProductService(id);
    if (!resp) return res.status(404).json("Producto no encontrado");
    res.redirect("/")
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getproductByName = async (req, res) => {
  try {
    console.log(req.body);
    const { nombre } = req.body;
    const user = req.session.userData;
    console.log("se guarda",nombre);
    const resp = await obtenerProductoPorNombre(nombre);

    console.log("se encontro :",resp);

    if (!resp) {
      res.status(404).json("no se encontro el productos");
      return;
    }
    res.render("filterProducts",{resp, user: user, nombre});
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProducts,
  editProducts,
  deleteProducts,
  getproductByName,
  renderEditProduct,
};
