//frontend\src\pages\RegistroVentasDiario.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegistroVentasDiario() {
    const [ventasDiarias, setVentasDiarias] = useState([]);
    const [error, setError] = useState(null);
    const [cargando, setCargando] = useState(true);

    const cargarVentasDiarias = async () => {
        setCargando(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3000/api/ventas/diarias'); // Ajusta la ruta de tu API
            setVentasDiarias(response.data);
            setCargando(false);
        } catch (error) {
            console.error('Error al cargar las ventas diarias:', error);
            setError('Error al cargar las ventas diarias ❌');
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarVentasDiarias();
    }, []);

    if (cargando) {
        return <p>Cargando ventas del día...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="registro-ventas-diarias">
            <h2>Ventas del Día</h2>
            {ventasDiarias.length === 0 ? (
                <p>No hay ventas registradas hoy.</p>
            ) : (
                <table className="tabla-ventas-diarias">
                    <thead>
                        <tr>
                            <th>ID Venta</th>
                            <th>Fecha y Hora</th>
                            <th>Total</th>
                            {/* Opcional: <th>Acciones</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {ventasDiarias.map(venta => (
                            <tr key={venta.id}>
                                <td>{venta.id}</td>
                                <td>{new Date(venta.fecha_venta).toLocaleString('es-PE')}</td>
                                <td>S/. {parseFloat(venta.total_venta).toFixed(2)}</td>
                                {/* Opcional: <td><button className="btn-ver-boleta">Ver</button></td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default RegistroVentasDiario;