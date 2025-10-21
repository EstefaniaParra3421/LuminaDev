const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  descripcion: String,
  categoria: String,
});

module.exports = mongoose.model("Product", productSchema);
