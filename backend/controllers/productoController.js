// backend/controllers/productoController.js
const Producto = require('../models/producto.js');

const productoController = {
  getAllProductos: (req, res) => {
    Producto.getAll((err, productos) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(productos);
      }
    });
  },

  getProductoById: (req, res) => {
    Producto.getById(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.length === 0) {
        res.status(404).send({ message: 'Producto no encontrado' });
      } else {
        res.json(result[0]);  // 👈 devolvemos el primer elemento
      }
    });
  },

  createProducto: (req, res) => {
    Producto.create(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json({ message: 'Producto creado exitosamente', id: result.insertId });
      }
    });
  },

  updateProducto: (req, res) => {
    Producto.update(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Producto actualizado exitosamente' });
      }
    });
  },

  deleteProducto: (req, res) => {
    Producto.delete(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Producto eliminado exitosamente' });
      }
    });
  },
};

module.exports = productoController;
