const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  contraseña: String,
});

module.exports = mongoose.model("User", userSchema);
