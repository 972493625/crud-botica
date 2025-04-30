const db = require('../models/db.js');

const Venta = {
    create: (venta, callback) => {
        if (!venta.items || venta.items.length === 0) {
            return callback(new Error('No hay items en la venta'), null);
        }

        db.beginTransaction((errBegin) => {
            if (errBegin) {
                return callback(errBegin, null);
            }

            const sqlCabecera = `INSERT INTO ventas (fecha_venta, total, usuario_id) VALUES (NOW(), ?, ?)`;
            db.query(sqlCabecera, [venta.total_venta, venta.usuario_id], (errCabecera, resultCabecera) => {
                if (errCabecera) {
                    return db.rollback(() => {
                        callback(errCabecera, null);
                    });
                }

                const ventaId = resultCabecera.insertId;
                const detalles = venta.items.map(item => [
                    ventaId,
                    item.producto_id,
                    item.cantidad,
                    item.precio_unitario
                ]);

                const sqlDetalle = `
                    INSERT INTO detalle_venta (venta_id, producto_id, cantidad, precio_unitario)
                    VALUES ?
                `;
                db.query(sqlDetalle, [detalles], (errDetalle, resultDetalle) => {
                    if (errDetalle) {
                        return db.rollback(() => {
                            callback(errDetalle, null);
                        });
                    }

                    const updatePromises = venta.items.map(item => {
                        return new Promise((resolve, reject) => {
                            const sqlStock = `
                                UPDATE productos
                                SET stock = stock - ?
                                WHERE id = ? AND stock >= ?`;

                            db.query(sqlStock, [item.cantidad, item.producto_id, item.cantidad], (errStock, resultStock) => {
                                if (errStock || resultStock.affectedRows === 0) {
                                    reject(errStock || new Error(`Stock insuficiente para el producto ID: ${item.producto_id}`));
                                } else {
                                    resolve();
                                }
                            });
                        });
                    });

                    Promise.all(updatePromises)
                        .then(() => {
                            db.commit((errCommit) => {
                                if (errCommit) {
                                    return db.rollback(() => {
                                        callback(errCommit, null);
                                    });
                                }
                                callback(null, { venta_id: ventaId, detalles_registrados: resultDetalle.affectedRows });
                            });
                        })
                        .catch(errStock => {
                            db.rollback(() => {
                                callback(errStock, null);
                            });
                        });
                });
            });
        });
    }
};

module.exports = Venta;