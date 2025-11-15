const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage }).fields([
  { name: "portada", maxCount: 1 },
  { name: "imagenes", maxCount: 5 },
]);

router.post("/", upload, productController.createProduct);

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.put("/:id", upload, productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
