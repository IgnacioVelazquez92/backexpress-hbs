
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
    if (resp.lenght === 0)
      return res.render("errorPage",{msg: "No se ha encontrado productos"});
    res.render("index", { title: "Polaris 3D", resp, user: user });
  } catch (error) {
    res.render("errorPage",{msg: error.message});
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await getProductByIdService(id);
    if (!resp)
      return res.render("errorPage",{msg: "El producto  no se ha encontrado"});
    res.status(200).json(resp);
  } catch (error) {
    res.render("errorPage",{msg: error.message});
  }
};

const createProducts = async (req, res) => {
  try {
    const productData = req.body;
    const resp = await createProductService(productData);
    res.redirect("/");
  } catch (error) {
    res.render("errorPage",{msg: error.message});
  }
};

const editProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;
  
    if(productData.inStock=="on"){
      productData.inStock=true
    }
    if(!productData.inStock){
      productData.inStock=false
    }
    const resp = await editProductService(id, productData);
    if (!resp) return res.render("errorPage",{msg: "El producto  no se ha encontrado"});
    res.redirect("/");
  } catch (error) {

    res.render("errorPage",{msg: error.message});

  }
};

const renderEditProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await getProductByIdService(id);
    // console.log(resp);
    if (!resp)
      return res.render("errorPage",{msg: "El producto  no se ha encontrado"});

    res.render("editProduct", { resp });
  } catch (error) {
    res.render("errorPage",{msg: error.message});

  }
};

const deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await deleteProductService(id);
    if (!resp) return res.render("errorPage",{msg: "El producto  no se ha encontrado"});
    res.redirect("/")
  } catch (error) {
    res.render("errorPage",{msg: error.message});
  }
};

const getproductByName = async (req, res) => {
  try {
    console.log(req.body);
    const { nombre } = req.body;
    const user = req.session.userData;

    const resp = await obtenerProductoPorNombre(nombre);

    if (!resp) {
      res.render("errorPage",{msg: "El producto  no se ha encontrado"});
      return;
    }
    res.render("filterProducts",{resp, user: user, nombre});
  } catch (error) {
    res.render("errorPage",{msg: error.message});
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
