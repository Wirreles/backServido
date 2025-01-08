const { db } = require("../firebase");
const { v4: uuidv4 } = require('uuid');

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const querySnapshot = await db.collection("products").get();

    if (querySnapshot.empty) {
      console.log("No se encontraron productos en la colección 'products'.");
      return res.status(404).json({ message: "No se encontraron productos." });
    }

    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error.message);
    res.status(500).json({ error: "Error al obtener productos. Intente nuevamente más tarde." });
  }
};

const createProduct = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      console.error("El cuerpo de la solicitud está vacío.");
      return res.status(400).json({ error: "El cuerpo de la solicitud está vacío." });
    }

    const { title, price, category, images, description, stock, brand } = req.body;

    if (!title || !price || !category || !images) {
      console.error("Datos faltantes:", req.body);
      return res.status(400).json({
        error: 'Datos incompletos. Se requiere "title", "price", "category" y "images".',
      });
    }

    // Generar un ID único para el producto
    const id = uuidv4();

    // Crear el objeto del producto
    const product = {
      id, // Asignar el ID único
      title,
      price,
      category,
      images,
      brand,
      description: description || "",
      stock: stock || 0,
      // createdAt: new Date().toISOString(), 
    };

    // Guardar en Firestore
    const productRef = await db.collection("products").doc(id).set(product);

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creando producto:", error.message);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const productDoc = await db.collection("products").doc(id).get();

    if (!productDoc.exists) {
      return res.status(404).json({ error: "Producto no encontrado." });
    }

    res.status(200).json({ id: productDoc.id, ...productDoc.data() });
  } catch (error) {
    console.error("Error obteniendo producto por ID:", error.message);
    res.status(500).json({ error: "Error obteniendo producto por ID." });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const productRef = db.collection("products").doc(id);
    await productRef.update(data);

    res.status(200).json({ id, ...data });
  } catch (error) {
    console.error("Error actualizando producto:", error.message);
    res.status(500).json({ error: "Error actualizando producto." });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const productRef = db.collection("products").doc(id);
    await productRef.delete();

    res.status(200).json({ message: "Producto eliminado con éxito." });
  } catch (error) {
    console.error("Error eliminando producto:", error.message);
    res.status(500).json({ error: "Error eliminando producto." });
  }
};

// Exportar funciones
module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
