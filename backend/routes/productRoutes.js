const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController.js');

// Rutas para productos
router.get('/products', productoController.getAllProductos); // Mantén esta ruta para obtener todos los productos
router.get('/products/:id', productoController.getProductoById);
router.post('/products', productoController.createProducto);
router.put('/products/:id', productoController.updateProducto);
router.delete('/products/:id', productoController.deleteProducto);

// Nueva ruta para buscar productos por nombre o código
router.get('/products', productoController.buscarProductos);

// Rutas para categorías y proveedores
router.get('/categorias', productoController.getAllCategorias);
router.get('/proveedores', productoController.getAllProveedores);

module.exports = router;