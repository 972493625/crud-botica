// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController.js');

// Rutas para productos
router.get('/api/products', productoController.getAllProductos);
router.get('/api/products/:id', productoController.getProductoById);
router.post('/api/products', productoController.createProducto);
router.put('/api/products/:id', productoController.updateProducto);
router.delete('/api/products/:id', productoController.deleteProducto);

// Nuevas rutas para categorías y proveedores CON el prefijo /api
router.get('/api/categorias', productoController.getAllCategorias);
router.get('/api/proveedores', productoController.getAllProveedores);

module.exports = router;