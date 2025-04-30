const Producto = require('../models/producto.js');
const Categoria = require('../models/categoria.js');
const Proveedor = require('../models/proveedor.js');

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
    console.log("Datos recibidos para crear producto:", req.body);
    Producto.create(req.body, (err, result) => {
      if (err) {
        console.error("Error al crear producto en la base de datos:", err);
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

  buscarProductos: (req, res) => {
    const termino = req.query.q;
    if (termino) {
      Producto.buscar(termino, (err, productos) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(productos);
        }
      });
    } else {
      // Si no hay término de búsqueda, devolvemos todos los productos (comportamiento anterior de /api/products)
      Producto.getAll((err, productos) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(productos);
        }
      });
    }
  },

  getAllCategorias: (req, res) => {
    Categoria.getAll((err, categorias) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(categorias);
      }
    });
  },

  getAllProveedores: (req, res) => {
    Proveedor.getAll((err, proveedores) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(proveedores);
      }
    });
  },
};

module.exports = productoController;