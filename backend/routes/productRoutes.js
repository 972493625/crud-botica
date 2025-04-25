const express = require('express');
const router = express.Router();

//  Ruta de prueba (temporal)
router.get('/', (req, res) => {
  res.send('¡Rutas de productos funcionando!');
});

module.exports = router;