import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VentasPage() {
  const [busqueda, setBusqueda] = useState('');
  const [productosEncontrados, setProductosEncontrados] = useState([]);
  const [ventaItems, setVentaItems] = useState([]);
  const [totalVenta, setTotalVenta] = useState(0);
  const [listaProductos, setListaProductos] = useState([]); // Para la búsqueda

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
      setProductosEncontrados([]); // Limpiar resultados si no hay búsqueda
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
            ? { ...item, cantidad: item.cantidad + 1 }
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
        item.producto.id === productoId ? { ...item, cantidad: cantidad } : item
      )
    );
  };

  const eliminarProductoDeVenta = (productoId) => {
    setVentaItems(ventaItems.filter((item) => item.producto.id !== productoId));
  };

  const registrarVenta = () => {
    // Lógica para enviar la información de la venta al backend
    console.log('Productos a vender:', ventaItems);
    // Aquí deberías formatear los datos para enviarlos al backend
    // y luego hacer la llamada POST a /api/ventas/registrar.
  };

  useEffect(() => {
    cargarProductosIniciales();
  }, []);

  useEffect(() => {
    // Recalcular el total cada vez que cambia ventaItems
    const nuevoTotal = ventaItems.reduce(
      (sum, item) => sum + item.producto.precio_venta * item.cantidad,
      0
    );
    setTotalVenta(nuevoTotal);
  }, [ventaItems]);

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
                    onChange={(e) => actualizarCantidad(item.producto.id, parseInt(e.target.value))}
                    min="1"
                    max={item.producto.stock} // Limitar por el stock disponible
                  />
                </td>
                <td>S/. {(item.producto.precio_venta * item.cantidad).toFixed(2)}</td>
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
        {/* Aquí podríamos agregar los campos para el método de pago, monto recibido, etc. */}
        <button className="btn btn-primary" onClick={registrarVenta}>
          Registrar Venta
        </button>
      </div>
    </div>
  );
}

export default VentasPage;