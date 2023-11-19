const { Schema, model } = require("mongoose");

const prductSchema = Schema({
  title: {
    type: String,
    required: [true, "Este campo es requerido"],
  },

  category: {
    type: String,
    required: [true, "Este campo es requerido"],
  },

  description: {
    type: String,
    required: [true, "Este campo es requerido"],
  },

  img: {
    type: String,
    required: [true, "Este campo es requerido"],
  },

  price: {
    type: Number,
    required: [true, "Este campo es requerido"],
  },

  inStock: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Product", prductSchema);
