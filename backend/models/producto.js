// models/producto.js
const db = require('../models/db.js'); 

const Producto = {
  getAll: (callback) => {
    db.query('SELECT * FROM productos', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM productos WHERE id = ?', [id], callback);
  },

  create: (producto, callback) => {
    db.query('INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
      [producto.nombre, producto.precio, producto.stock],
      callback);
  },

  update: (id, producto, callback) => {
    db.query('UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
      [producto.nombre, producto.precio, producto.stock, id],
      callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM productos WHERE id = ?', [id], callback);
  }
};

module.exports = Producto;