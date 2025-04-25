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
    Producto.getById(req.params.id, (err, producto) => {
      if (err) {
        res.status(500).send(err);
      } else if (!producto) {
        res.status(404).send({ message: 'Producto no encontrado' });
      } else {
        res.json(producto);
      }
    });
  },

  createProducto: (req, res) => {
    Producto.create(req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).json({ message: 'Producto creado', id: result.insertId });
      }
    });
  },

  updateProducto: (req, res) => {
    Producto.update(req.params.id, req.body, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Producto actualizado' });
      }
    });
  },

  deleteProducto: (req, res) => {
    Producto.delete(req.params.id, (err) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Producto eliminado' });
      }
    });
  },
};

module.exports = productoController;