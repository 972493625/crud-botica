import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegistroVentasDiario() {
    const [productosVendidosHoy, setProductosVendidosHoy] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    const cargarProductosVendidosHoy = async () => {
        setCargando(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/api/ventas/diarias');
            setProductosVendidosHoy(response.data);
            setCargando(false);
        } catch (error) {
            console.error('Error al cargar los productos vendidos hoy:', error);
            setError('Error al cargar los productos vendidos hoy ❌');
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarProductosVendidosHoy();
    }, []);

    if (cargando) {
        return <p>Cargando productos vendidos hoy...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h3>Lista de Productos Vendidos Hoy</h3>
            {productosVendidosHoy.length === 0 ? (
                <p>No se han vendido productos hoy.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre del Producto</th>
                            <th>Cantidad Vendida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosVendidosHoy.map((venta) => (
                            <tr key={venta.nombre_producto}>
                                <td>{venta.nombre_producto}</td>
                                <td>{venta.cantidad_vendida}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default RegistroVentasDiario;