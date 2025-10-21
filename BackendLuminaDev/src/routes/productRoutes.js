const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/", productController.createProduct);     // Crear producto
router.get("/", productController.getProducts);        // Listar todos
router.get("/:id", productController.getProductById);  // Obtener uno
router.put("/:id", productController.updateProduct);   // Actualizar
router.delete("/:id", productController.deleteProduct);// Eliminar

module.exports = router;
