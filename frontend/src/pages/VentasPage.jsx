import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RegistroVentasDiario from './RegistroVentasDiario';

function VentasPage() {
    const [busqueda, setBusqueda] = useState('');
    const [productosEncontrados, setProductosEncontrados] = useState([]);
    const [ventaItems, setVentaItems] = useState([]);
    const [totalVenta, setTotalVenta] = useState(0);
    const [listaProductos, setListaProductos] = useState([]); // Para la búsqueda
    const [boletaData, setBoletaData] = useState(null);
    const [mostrarBoleta, setMostrarBoleta] = useState(false);
    const [ventaRegistradaRecientemente, setVentaRegistradaRecientemente] = useState(false);
    const [mostrarVentasDiarias, setMostrarVentasDiarias] = useState(false); // Nuevo estado

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
            setMostrarVentasDiarias(true); // Mostrar ventas diarias automáticamente después de registrar
        } catch (error) {
            console.error('Error al registrar la venta:', error);
            alert('Error al registrar la venta ❌. Detalles: ' + error.message);
        }
    };

    const cerrarBoleta = () => {
        setMostrarBoleta(false);
        setBoletaData(null);
    };

    const toggleMostrarVentasDiarias = () => {
        setMostrarVentasDiarias(!mostrarVentasDiarias);
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
    const fechaFormateada = fechaVenta.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const subtotal = data.items.reduce((sum, item) =>
      sum + parseFloat(item.producto.precio_venta) * parseInt(item.cantidad, 10), 0);
    const igv = 0;
    const total = subtotal + igv;

    return (
      <div className="modal show d-block bg-dark bg-opacity-75" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content p-4">
            <div className="modal-header">
              <h5 className="modal-title">Boleta de Venta</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="text-center mb-4">
                <h4>Botica vida luz</h4>
                <p>Jr. Comercial 123, Lima - Perú</p>
              </div>
              <p><strong>Número de Boleta:</strong> {data.ventaId}</p>
              <p><strong>Fecha y Hora:</strong> {fechaFormateada}</p>
              <table className="table table-bordered table-striped mt-3">
                <thead className="table-light">
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map(item => (
                    <tr key={item.producto.id}>
                      <td>{item.producto.nombre}</td>
                      <td>{item.cantidad}</td>
                      <td>S/. {parseFloat(item.producto.precio_venta).toFixed(2)}</td>
                      <td>S/. {(parseFloat(item.producto.precio_venta) * parseInt(item.cantidad, 10)).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end"><strong>Subtotal:</strong></td>
                    <td>S/. {subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                    <td><strong>S/. {total.toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={() => window.print()}>Imprimir</button>
              <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center text-primary">Registro de Ventas</h1>

      <div className="card mb-4">
        <div className="card-body">
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
            <ul className="list-group mt-2">
              {productosEncontrados.map(producto => (
                <li
                  key={producto.id}
                  className="list-group-item list-group-item-action"
                  onClick={() => agregarProductoAVenta(producto)}
                  style={{ cursor: 'pointer' }}
                >
                  {producto.nombre} ({producto.codigo}) - Stock: {producto.stock} - S/. {producto.precio_venta}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5>Productos en Venta</h5>
          {ventaItems.length === 0 ? (
            <p className="text-muted">No hay productos añadidos.</p>
          ) : (
            <table className="table table-hover">
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
                {ventaItems.map(item => (
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
                      <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarProductoDeVenta(item.producto.id)}>
                        🗑 Eliminar
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
        </div>
      </div>

      <div className="d-flex gap-2 mb-4">
        <button className="btn btn-primary" onClick={registrarVenta}>💾 Registrar Venta</button>
        <button className="btn btn-info" onClick={toggleMostrarVentasDiarias}>
          {mostrarVentasDiarias ? '🔽 Ocultar Ventas del Día' : '📅 Ver Ventas del Día'}
        </button>
      </div>

      {mostrarVentasDiarias && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">Ventas del Día</h5>
            <RegistroVentasDiario ventaRegistrada={ventaRegistradaRecientemente} />
          </div>
        </div>
      )}

      {mostrarBoleta && <Boleta data={boletaData} onClose={cerrarBoleta} />}
    </div>
  );
}

export default VentasPage;
