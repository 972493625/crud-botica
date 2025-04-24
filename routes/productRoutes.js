const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Obtener productos
  router.get('/', (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });

  // Agregar producto
  router.post('/', (req, res) => {
    const { name, description, price, stock } = req.body;
    db.query(
      'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
      [name, description, price, stock],
      (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: result.insertId, name, description, price, stock });
      }
    );
  });

  return router;
};
