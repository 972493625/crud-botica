import React, { useEffect, useState } from 'react';
import ProductoForm from '../components/ProductoForm';
import ProductoTable from '../components/ProductoTable';
import axios from 'axios';

const InventarioPage = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);

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
    <div className="container">
      <h1>Inventario de Productos</h1>
      <ProductoForm
        cargarProductos={fetchProductos}
        productoEditar={productoEditar}
        limpiarProductoEditar={limpiarProductoEditar}
      />
      <ProductoTable
        productos={productos}
        eliminarProducto={eliminarProducto}
        cargarProductoEditar={cargarProductoEditar}
      />
    </div>
  );
};

export default InventarioPage;
