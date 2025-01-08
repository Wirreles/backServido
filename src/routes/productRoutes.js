const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const router = express.Router();

// Ruta para obtener todos los productos
router.get("/", getProducts);

// Ruta para crear un producto
router.post("/create", createProduct);

// Ruta para obtener un producto por ID
router.get("/:id", getProductById);

// Ruta para actualizar un producto
router.put("/:id", updateProduct);

// Ruta para eliminar un producto
router.delete("/:id", deleteProduct);

module.exports = router;
