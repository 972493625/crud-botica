const Venta = require('../models/Venta.js');

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
    }
};

module.exports = ventaController;