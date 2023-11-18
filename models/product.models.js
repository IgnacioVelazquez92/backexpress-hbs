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
    default: false,
  },

  disabled: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Product", prductSchema);
