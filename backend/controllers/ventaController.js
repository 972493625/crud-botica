// backend/controllers/ventaController.js
const Venta = require('../models/Venta.js');
// Asume que tienes modelos para DetalleVenta y Producto si usas Mongoose/Sequelize
// const DetalleVenta = require('../models/DetalleVenta.js');
// const Producto = require('../models/Producto.js');
const db = require('../models/db'); // Importa tu conexión a la base de datos

const ventaController = {
    registrarVenta: (req, res) => {
        console.log('req.body:', req.body);
        const ventaData = {
            total_venta: req.body.totalVenta,
            items: req.body.ventaItems,
            usuario_id: req.body.usuario_id,
        };

        Venta.create(ventaData, (err, result) => {
            if (err) {
                console.error("Error al registrar la venta:", err);
                res.status(500).send(err);
            } else {
                res.status(201).json({ message: 'Venta registrada exitosamente', venta_id: result.venta_id });
            }
        });
    },

    obtenerVentasDiarias: (req, res) => {
        const query = `
            SELECT
                p.nombre AS nombre_producto,
                SUM(dv.cantidad) AS cantidad_vendida
            FROM ventas v
            JOIN detalle_venta dv ON v.id = dv.venta_id  -- Corrección aquí: v.id en lugar de v.venta_id
            JOIN productos p ON dv.producto_id = p.id
            WHERE DATE(v.fecha_venta) = CURDATE()
            GROUP BY p.nombre
            LIMIT 0, 25;
        `;

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error al obtener las ventas diarias:', err);
                return res.status(500).json({ error: 'Error al obtener las ventas diarias' });
            }
            res.json(results);
        });
    }
};

module.exports = ventaController;