import React, { useEffect, useState } from 'react';
import ProductoForm from '../components/ProductoForm';
import ProductoTable from '../components/ProductoTable';
import axios from 'axios';

const InventarioPage = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarTabla, setMostrarTabla] = useState(true); // Inicialmente mostrar la tabla

  const fetchProductos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/products');
      setProductos(res.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const cargarProductoEditar = (producto) => {
    setProductoEditar(producto);
    setMostrarFormulario(true);
    setMostrarTabla(false); // Ocultar la tabla al mostrar el formulario de edición
  };

  const limpiarProductoEditar = () => {
    setProductoEditar(null);
  };

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      alert('Producto eliminado ✅');
      fetchProductos();
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar producto ❌');
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Inventario de Productos</h1>

      <div className="mb-3">
        <button
          className="btn btn-success me-2"
          onClick={() => {
            setMostrarFormulario(true);
            setMostrarTabla(false);
          }}
        >
          Agregar Producto
        </button>

        <button
          className="btn btn-info"
          onClick={() => {
            setMostrarTabla(true);
            setMostrarFormulario(false);
          }}
        >
          Lista de Productos
        </button>
      </div>

      <div className="row">
        {mostrarFormulario && (
          <div className="col-md-12"> {/* Cambiado a col-md-12 para ocupar todo el ancho */}
            <div className="card p-3 shadow">
              <h4 className="mb-3">{productoEditar ? 'Editar Producto' : 'Registrar Producto'}</h4>
              <ProductoForm
                cargarProductos={fetchProductos}
                productoEditar={productoEditar}
                limpiarProductoEditar={limpiarProductoEditar}
              />
            </div>
          </div>
        )}

        {mostrarTabla && (
          <div className="col-md-12 mt-4">
            <div className="card p-3 shadow">
              <h4 className="mb-3">Lista de Productos</h4>
              <ProductoTable
                productos={productos}
                eliminarProducto={eliminarProducto}
                cargarProductoEditar={cargarProductoEditar}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventarioPage;