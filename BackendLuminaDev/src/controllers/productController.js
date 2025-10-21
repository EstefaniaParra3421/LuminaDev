const productsModel = require("../models/productModel");

// Crear producto
exports.createProduct = async (req, res) => {
  try {
    const product = new productsModel(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los productos
exports.getProducts = async (req, res) => {
  try {
    const products = await productsModel.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    const product = await productsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar producto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await productsModel.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
