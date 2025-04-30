const db = require('../models/db.js');

const Producto = {
  getAll: (callback) => {
    db.query('SELECT * FROM productos', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM productos WHERE id = ?', [id], callback);
  },

  create: (producto, callback) => {
    const sql = `
      INSERT INTO productos
      (nombre, codigo, precio_compra, precio_venta, stock, stock_minimo, fecha_caducidad, categoria_id, proveedor_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      producto.nombre,
      producto.codigo,
      producto.precio_compra,
      producto.precio_venta,
      producto.stock,
      producto.stock_minimo,
      producto.fecha_caducidad,
      producto.categoria_id,
      producto.proveedor_id,
    ];
    db.query(sql, values, callback);
  },

  update: (id, producto, callback) => {
    const sql = `
      UPDATE productos SET
        nombre = ?,
        codigo = ?,
        precio_compra = ?,
        precio_venta = ?,
        stock = ?,
        stock_minimo = ?,
        fecha_caducidad = ?,
        categoria_id = ?,
        proveedor_id = ?
      WHERE id = ?
    `;
    const values = [
      producto.nombre,
      producto.codigo,
      producto.precio_compra,
      producto.precio_venta,
      producto.stock,
      producto.stock_minimo,
      producto.fecha_caducidad,
      producto.categoria_id,
      producto.proveedor_id,
      id
    ];
    console.log("Consulta UPDATE:", sql, values);
    db.query(sql, values, callback);
  },

  delete: (id, callback) => {
    db.query('DELETE FROM productos WHERE id = ?', [id], callback);
  },

  buscar: (termino, callback) => {
    const sql = `
      SELECT * FROM productos
      WHERE nombre LIKE ? OR codigo LIKE ?
    `;
    const values = [`%${termino}%`, `%${termino}%`];
    db.query(sql, values, callback);
  },
};

module.exports = Producto;