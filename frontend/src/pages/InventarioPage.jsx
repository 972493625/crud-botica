import React, { useEffect, useState } from 'react';
import ProductoForm from '../components/ProductoForm';
import ProductoTable from '../components/ProductoTable';
import axios from 'axios';

const InventarioPage = () => {
  const [productos, setProductos] = useState([]);

  const fetchProductos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/products');
      setProductos(res.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container">
      <h1>Inventario de Productos</h1>
      <ProductoForm fetchProductos={fetchProductos} />
      <ProductoTable productos={productos} fetchProductos={fetchProductos} />
    </div>
  );
};

export default InventarioPage;
