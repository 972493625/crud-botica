// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController.js');

// Rutas para productos (ya están bien con /api/products)
router.get('/products', productoController.getAllProductos);
router.get('/products/:id', productoController.getProductoById);
router.post('/products', productoController.createProducto);
router.put('/products/:id', productoController.updateProducto);
router.delete('/products/:id', productoController.deleteProducto);

// Rutas para categorías y proveedores AHORA CON el prefijo /api
router.get('/categorias', productoController.getAllCategorias);
router.get('/proveedores', productoController.getAllProveedores);

module.exports = router;