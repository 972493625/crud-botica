import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistroVentasDiario from './RegistroVentasDiario'; // Importa el nuevo componente

function VentasPage() {
    const [busqueda, setBusqueda] = useState('');
    const [productosEncontrados, setProductosEncontrados] = useState([]);
    const [ventaItems, setVentaItems] = useState([]);
    const [totalVenta, setTotalVenta] = useState(0);
    const [listaProductos, setListaProductos] = useState([]); // Para la búsqueda
    const [boletaData, setBoletaData] = useState(null);
    const [mostrarBoleta, setMostrarBoleta] = useState(false);
    const [ventaRegistradaRecientemente, setVentaRegistradaRecientemente] = useState(false);

    const cargarProductosIniciales = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/products');
            setListaProductos(response.data);
        } catch (error) {
            console.error('Error al cargar productos iniciales:', error);
            alert('Error al cargar la lista de productos para la búsqueda ❌');
        }
    };

    const handleBusquedaChange = async (event) => {
        const terminoBusqueda = event.target.value;
        setBusqueda(terminoBusqueda);

        if (terminoBusqueda.trim() === '') {
            setProductosEncontrados([]);
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/products?q=${terminoBusqueda}`);
            setProductosEncontrados(response.data);
        } catch (error) {
            console.error('Error al buscar productos:', error);
            setProductosEncontrados([]);
        }
    };

    const agregarProductoAVenta = (producto) => {
        const existeEnVenta = ventaItems.find((item) => item.producto.id === producto.id);
        if (existeEnVenta) {
            setVentaItems(
                ventaItems.map((item) =>
                    item.producto.id === producto.id
                        ? { ...item, cantidad: parseInt(item.cantidad, 10) + 1 }
                        : item
                )
            );
        } else {
            setVentaItems([...ventaItems, { producto: producto, cantidad: 1 }]);
        }
    };

    const actualizarCantidad = (productoId, cantidad) => {
        setVentaItems(
            ventaItems.map((item) =>
                item.producto.id === productoId ? { ...item, cantidad: parseInt(cantidad, 10) } : item
            )
        );
    };

    const eliminarProductoDeVenta = (productoId) => {
        setVentaItems(ventaItems.filter((item) => item.producto.id !== productoId));
    };

    const registrarVenta = async () => {
        if (ventaItems.length === 0) {
            alert('No hay productos en la venta.');
            return;
        }

        const usuarioId = 1; // Simulación

        try {
            const ventaData = {
                ventaItems: ventaItems.map(item => ({
                    producto_id: item.producto.id,
                    cantidad: parseInt(item.cantidad, 10),
                    precio_unitario: item.producto.precio_venta,
                })),
                totalVenta: totalVenta,
                usuario_id: usuarioId,
            };

            const response = await axios.post('http://localhost:3000/api/ventas/registrar', ventaData);
            alert(`Venta registrada exitosamente con ID: ${response.data.venta_id}`);
            setBoletaData({ ventaId: response.data.venta_id, items: ventaItems, total: totalVenta });
            setMostrarBoleta(true); // Mostrar la boleta después de registrar la venta
            setVentaItems([]);
            setTotalVenta(0);
            setBusqueda('');
            setProductosEncontrados([]);
            setVentaRegistradaRecientemente(true); // Indica que se registró una venta
            setTimeout(() => setVentaRegistradaRecientemente(false), 100); // Resetear el estado después de un breve tiempo
        } catch (error) {
            console.error('Error al registrar la venta:', error);
            alert('Error al registrar la venta ❌. Detalles: ' + error.message);
        }
    };

    const cerrarBoleta = () => {
        setMostrarBoleta(false);
        setBoletaData(null);
    };

    useEffect(() => {
        cargarProductosIniciales();
    }, []);

    useEffect(() => {
        const nuevoTotal = ventaItems.reduce(
            (sum, item) => sum + parseFloat(item.producto.precio_venta) * parseInt(item.cantidad, 10),
            0
        );
        setTotalVenta(nuevoTotal);
    }, [ventaItems]);

    const Boleta = ({ data, onClose }) => {
        if (!data) return null;

        const fechaVenta = new Date();
        const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        const fechaFormateada = fechaVenta.toLocaleDateString('es-PE', opcionesFecha);

        const subtotal = data.items.reduce((sum, item) => sum + parseFloat(item.producto.precio_venta) * parseInt(item.cantidad, 10), 0);
        const igv = 0; // Puedes calcular el IGV si es necesario
        const total = subtotal + igv;

        return (
            <div className="boleta-modal"> {/* Estilos de modal */}
                <div className="boleta-imprimir"> {/* Estilos de impresión */}
                    <div className="boleta-header">
                        <h2>Botica Nova Salud</h2>
                        <p>Jr. Comercial 123, Lima - Perú</p>
                    </div>

                    <div className="boleta-info">
                        <h3>BOLETA DE VENTA</h3>
                        <p><strong>Número de Boleta:</strong> {data.ventaId}</p>
                        <p><strong>Fecha y Hora:</strong> {fechaFormateada}</p>
                    </div>

                    <table className="boleta-detalle">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th className="text-right">Total Parcial</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.map(item => (
                                <tr key={item.producto.id}>
                                    <td>{item.producto.nombre}</td>
                                    <td>{item.cantidad}</td>
                                    <td>S/. {parseFloat(item.producto.precio_venta).toFixed(2)}</td>
                                    <td className="text-right">S/. {(parseFloat(item.producto.precio_venta) * parseInt(item.cantidad, 10)).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="3" className="text-right"><strong>Subtotal:</strong></td>
                                <td className="text-right">S/. {subtotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="3" className="text-right"><strong>TOTAL:</strong></td>
                                <td className="text-right"><strong>S/. {total.toFixed(2)}</strong></td>
                            </tr>
                        </tfoot>
                    </table>

                    <div className="boleta-footer">
                        <p><strong>Gracias por su compra en Botica Nova Salud</strong></p>
                    </div>

                    <button onClick={() => window.print()}>Imprimir Boleta</button>
                    <button className="btn btn-secondary mt-2" onClick={onClose}>Cerrar Boleta</button>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            <h1>Registro de Ventas</h1>

            <div className="mb-3">
                <label htmlFor="busquedaProducto" className="form-label">Buscar Producto:</label>
                <input
                    type="text"
                    className="form-control"
                    id="busquedaProducto"
                    value={busqueda}
                    onChange={handleBusquedaChange}
                    placeholder="Nombre o código del producto"
                />
                {productosEncontrados.length > 0 && (
                    <ul className="list-group">
                        {productosEncontrados.map((producto) => (
                            <li
                                key={producto.id}
                                className="list-group-item list-group-item-action"
                                onClick={() => agregarProductoAVenta(producto)}
                            >
                                {producto.nombre} ({producto.codigo}) - Stock: {producto.stock} - S/. {producto.precio_venta}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <h2>Productos en Venta</h2>
            {ventaItems.length === 0 ? (
                <p>No hay productos en la venta actual.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio Unitario</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventaItems.map((item) => (
                            <tr key={item.producto.id}>
                                <td>{item.producto.nombre}</td>
                                <td>S/. {item.producto.precio_venta}</td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={item.cantidad}
                                        onChange={(e) => actualizarCantidad(item.producto.id, e.target.value)}
                                        min="1"
                                        max={item.producto.stock}
                                    />
                                </td>
                                <td>S/. {(parseFloat(item.producto.precio_venta) * parseInt(item.cantidad, 10)).toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => eliminarProductoDeVenta(item.producto.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                            <td><strong>S/. {totalVenta.toFixed(2)}</strong></td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>
            )}

            <div className="mt-3">
                <h2>Opciones de Pago</h2>
                <button className="btn btn-primary" onClick={registrarVenta}>
                    Registrar Venta
                </button>
            </div>

            <RegistroVentasDiario ventaRegistrada={ventaRegistradaRecientemente} />

            {mostrarBoleta && <Boleta data={boletaData} onClose={cerrarBoleta} />}
        </div>
    );
}

export default VentasPage;