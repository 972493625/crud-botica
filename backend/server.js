// backend/server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ... (tu configuración de la base de datos) ...

const productRoutes = require('./routes/productRoutes');

// Monta todas las rutas definidas en productRoutes bajo el prefijo /api
app.use('/api', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});