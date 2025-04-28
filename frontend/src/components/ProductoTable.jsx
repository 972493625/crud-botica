// ProductoTable.jsx
import React from 'react';

function ProductoTable({ productos, eliminarProducto, cargarProductoEditar }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio Venta</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>{producto.nombre}</td>
            <td>S/. {producto.precio_venta}</td>
            <td>{producto.stock}</td>
            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => cargarProductoEditar(producto)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => eliminarProducto(producto.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductoTable;
