//routes/productRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../models/db.js'); 


// Actualizar producto
router.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    codigo_barras,
    precio_compra,
    precio_venta,
    stock,
    stock_minimo,
    fecha_caducidad,
    categoria_id,
    proveedor_id
  } = req.body;

  const sql = `
    UPDATE productos 
    SET nombre = ?, codigo_barras = ?, precio_compra = ?, precio_venta = ?, 
        stock = ?, stock_minimo = ?, fecha_caducidad = ?, categoria_id = ?, proveedor_id = ?
    WHERE id = ?
  `;

  db.query(sql, [nombre, codigo_barras, precio_compra, precio_venta, stock, stock_minimo, fecha_caducidad, categoria_id, proveedor_id, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto actualizado correctamente' });
  });
});
