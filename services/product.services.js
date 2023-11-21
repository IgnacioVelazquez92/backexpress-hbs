const Product = require("../models/product.models");

const getAllProductService = async () => {
  return await Product.find().lean();
};

const getProductByIdService = async (id) => {
  return Product.findById(id).lean();
};

const createProductService = async (products) => {
  const newProduct = new Product(products);
  return await newProduct.save();
};

const editProductService = async (id, productData) => {
  return Product.findByIdAndUpdate(id, productData);
};

const deleteProductService = async (id) => {
  return Product.findByIdAndDelete(id);
};

const obtenerProductoPorNombre = async (title) => {
  console.log("en el service llega :",title);
  const regex = new RegExp(`^${title}`, "i");
  const productos = await Product.find({ title: { $regex: regex } }).lean();
  return productos;
};

module.exports = {
  getAllProductService,
  getProductByIdService,
  createProductService,
  editProductService,
  deleteProductService,
  obtenerProductoPorNombre,
};
