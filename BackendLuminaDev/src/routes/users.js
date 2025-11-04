const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Rutas de usuarios
// router.get("/", userController.getUsers);           // Listar usuarios
router.post("/register", userController.register);  // Registrar usuario
router.post("/login", userController.login);        // Iniciar sesión

module.exports = router;
