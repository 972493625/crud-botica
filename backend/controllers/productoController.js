// backend/controllers/productoController.js
const Producto = require('../models/producto.js');
const Categoria = require('../models/categoria.js'); // Importa el modelo de Categoría (si existe)
const Proveedor = require('../models/proveedor.js'); // Importa el modelo de Proveedor (si existe)

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
        res.json(result[0]);
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

  // Nuevas funciones para obtener categorías y proveedores
  getAllCategorias: (req, res) => {
    Categoria.getAll((err, categorias) => { // Asumiendo que tienes un modelo Categoria con un método getAll
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(categorias);
      }
    });
  },

  getAllProveedores: (req, res) => {
    Proveedor.getAll((err, proveedores) => { // Asumiendo que tienes un modelo Proveedor con un método getAll
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(proveedores);
      }
    });
  },
};

module.exports = productoController;