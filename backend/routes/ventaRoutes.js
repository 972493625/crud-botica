// backend/routes/ventaRoutes.js
const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController.js');

router.post('/ventas/registrar', ventaController.registrarVenta);
router.get('/ventas/diarias', ventaController.obtenerVentasDiarias); // Agrega esta línea

module.exports = router;