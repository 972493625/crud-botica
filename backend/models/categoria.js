// backend/models/categoria.js
const db = require('../models/db.js');

const Categoria = {
  getAll: (callback) => {
    db.query('SELECT id, nombre FROM categorias', callback);
  }
};

module.exports = Categoria;