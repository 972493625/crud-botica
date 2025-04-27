// backend/server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// #######################################################################
// ### Middleware ########################################################
// #######################################################################

// Habilita CORS para permitir solicitudes desde diferentes dominios (tu frontend)
app.use(cors());

// Middleware para parsear el cuerpo de las peticiones HTTP en formato JSON
// Esto es crucial para que puedas acceder a los datos enviados en las peticiones
// POST y PUT a través de req.body
app.use(express.json());

// #######################################################################
// ### Configuración de la Base de Datos MySQL ############################
// #######################################################################

// Crea una conexión a la base de datos MySQL utilizando la información de .env
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Intenta conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Adjunta la conexión de la base de datos a la app para que esté disponible
app.use((req, res, next) => {
  req.db = db;
  next();
});

// #######################################################################
// ### Rutas #############################################################
// #######################################################################

const productRoutes = require('./routes/productRoutes');
const ventaRoutes = require('./routes/ventaRoutes'); // <---- Importa las rutas de venta

// Monta todas las rutas definidas en productRoutes bajo el prefijo /api
// Esto significa que todas las rutas en productRoutes (por ejemplo, /products,
// /products/:id, /categorias, /proveedores) ahora estarán accesibles bajo /api/products,
// /api/products/:id, /api/categorias, /api/proveedores, respectivamente.
app.use('/api', productRoutes);

// Monta las rutas de venta bajo el prefijo /api
// Esto permite que la ruta /api/ventas/registrar esté disponible
app.use('/api', ventaRoutes);

// #######################################################################
// ### Inicio del Servidor ################################################
// #######################################################################

const PORT = process.env.PORT || 3000;

// Inicia el servidor Express en el puerto especificado
app.listen(PORT, () => {
  console.log('Servidor corriendo en http://localhost:${PORT}');
}); 