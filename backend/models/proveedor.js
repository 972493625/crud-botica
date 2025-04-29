// backend/models/proveedor.js
const db = require('../models/db.js');

const Proveedor = {
  getAll: (callback) => {
    db.query('SELECT id, nombre FROM proveedores', callback);
  }
};

module.exports = Proveedor;