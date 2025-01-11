const express = require("express");
const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByUserId,
  getInactiveProductsByUserId,
  createProductFeature,
  getProductFeatures,
  createProductReview,
  getProductReviews
} = require("../controllers/productControllers");

const router = express.Router();

// Ruta para obtener todos los productos
router.get("/", getProducts);

// Ruta para crear un producto
router.post("/create", createProduct);

// Ruta para obtener un producto por ID
router.get("/:id", getProductById);

// Ruta para obtener productos por userId
router.get("/user/:id", getProductsByUserId);

// Ruta para actualizar un producto
router.put("/:id", updateProduct);

// Ruta para eliminar un producto
router.delete("/:id", deleteProduct);

// Ruta para obtener productos inactivos por userId
router.get("/user/:userId/inactive", getInactiveProductsByUserId);

// Ruta para agregar características a un producto
router.post("/:id/features", createProductFeature);

router.get("/:productId/features", getProductFeatures);

// Ruta para agregar reseñas a un producto
router.post("/:id/reviews", createProductReview);

// Ruta para obtener las reseñas de un producto
router.get("/:productId/reviews", getProductReviews);

module.exports = router;
