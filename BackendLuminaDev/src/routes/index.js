  const express = require("express");
  const router = express.Router();
  const users = require("./users");
  const products = require("./productRoutes");

  router.use("/users", users);
  router.use("/products", products);

  router.get("/", (req, res) => {
    res.json({ mensaje: "¡Bienvenido a mi API con Express!" });
  });

  module.exports = router;
