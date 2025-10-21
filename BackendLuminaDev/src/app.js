const express = require("express");
const connectDB = require("./config/database");
const routes = require("./routes");

const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const Category = require("./models/categoryModel");
const Cart = require("./models/cartModel");

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Usar las rutas definidas
app.use("/", routes);

// Crear documentos de prueba una sola vez (solo para comprobar la conexión)
// (async () => {
//   try {
//     const userCount = await User.countDocuments();
//     if (userCount === 0) {
//       await new User({ nombre: "Daniel", correo: "daniel@correo.com", contraseña: "1234" }).save();
//       await new Category({ nombre: "Luces LED", descripcion: "Luces decorativas" }).save();
//       await new Product({ nombre: "Tira LED RGB", precio: 1000, descripcion: "Tira LED de 5 metros", categoria: "Luces LED" }).save();
//       await new Order({ usuarioId: "1", productos: ["1"], total: 1000 }).save();
//       await new Cart({ usuarioId: "1", productos: ["1"], total: 1000 }).save();
//       console.log("✅ Colecciones y datos de prueba creados correctamente");
//     } else {
//       console.log("ℹ️ Ya existen datos, no se insertaron duplicados");
//     }
//   } catch (err) {
//     console.error("❌ Error creando datos de prueba:", err.message);
//   }
// })();

// Puerto
const PORT = process.env.PORT || 4000;

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
