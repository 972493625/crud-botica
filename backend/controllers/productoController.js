// Importamos los modelos necesarios
const Producto = require('../models/producto.js');
const Categoria = require('../models/categoria.js');
const Proveedor = require('../models/proveedor.js');

// Definimos el objeto controlador que contiene las funciones para manejar productos, categorías y proveedores
const productoController = {

  // Obtener todos los productos
  getAllProductos: (req, res) => {
    Producto.getAll((err, productos) => {
      if (err) {
        // Si hay error, enviamos estado 500 (error del servidor)
        res.status(500).send(err);
      } else {
        // Si todo va bien, enviamos los productos en formato JSON
        res.json(productos);
      }
    });
  },

  // Obtener un producto por ID
  getProductoById: (req, res) => {
    Producto.getById(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (result.length === 0) {
        // Si no se encuentra el producto, enviamos estado 404 (no encontrado)
        res.status(404).send({ message: 'Producto no encontrado' });
      } else {
        // Si se encuentra, devolvemos el primer resultado
        res.json(result[0]);
      }
    });
  },

  // Crear un nuevo producto
  createProducto: (req, res) => {
    console.log("Datos recibidos para crear producto:", req.body);
    Producto.create(req.body, (err, result) => {
      if (err) {
        console.error("Error al crear producto en la base de datos:", err);
        res.status(500).send(err);
      } else {
        // Producto creado exitosamente, respondemos con código 201 y el ID insertado
        res.status(201).json({ message: 'Producto creado exitosamente', id: result.insertId });
      }
    });
  },

  // Actualizar un producto por ID
  updateProducto: (req, res) => {
    Producto.update(req.params.id, req.body, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        // Enviamos mensaje de éxito
        res.json({ message: 'Producto actualizado exitosamente' });
      }
    });
  },

  // Eliminar un producto por ID
  deleteProducto: (req, res) => {
    Producto.delete(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: 'Producto eliminado exitosamente' });
      }
    });
  },

  // Buscar productos por término de búsqueda (query string ?q=)
  buscarProductos: (req, res) => {
    const termino = req.query.q;
    if (termino) {
      // Si hay término de búsqueda, llamamos a Producto.buscar
      Producto.buscar(termino, (err, productos) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(productos);
        }
      });
    } else {
      // Si no hay término, devolvemos todos los productos
      Producto.getAll((err, productos) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json(productos);
        }
      });
    }
  },

  // Obtener todas las categorías
  getAllCategorias: (req, res) => {
    Categoria.getAll((err, categorias) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(categorias);
      }
    });
  },

  // Obtener todos los proveedores
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

// Exportamos el controlador para poder usarlo en otros archivos (como las rutas)
module.exports = productoController;
