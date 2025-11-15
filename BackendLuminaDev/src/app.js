const express = require("express");
const connectDB = require("./config/database");
const routes = require("./routes");

const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const Category = require("./models/categoryModel");
const Cart = require("./models/cartModel");

const app = express();

connectDB();


app.use(express.json());

// Esto hace que /uploads/products/imagen.png sea accesible desde el navegador
app.use("/uploads", express.static("uploads"));

// Usar las rutas definidas
app.use("/", routes);

// Puerto
const PORT = process.env.PORT || 4000;

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
