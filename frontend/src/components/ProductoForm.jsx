// ProductoForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductoForm({ cargarProductos, productoEditar, limpiarProductoEditar }) {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
  });

  useEffect(() => {
    if (productoEditar) {
      setProducto(productoEditar);
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (producto.id) {
        // Editar producto existente
        await axios.put(`http://localhost:3000/api/products/${producto.id}`, producto);
        alert('Producto actualizado exitosamente ✅');
      } else {
        // Crear nuevo producto
        await axios.post('http://localhost:3000/api/products', producto);
        alert('Producto registrado exitosamente ✅');
      }
      setProducto({ nombre: '', precio: '', stock: '' });
      limpiarProductoEditar();
      cargarProductos();
    } catch (error) {
      console.error(error);
      alert('Error al guardar el producto ❌');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label>Nombre</label>
        <input
          type="text"
          className="form-control"
          name="nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Precio</label>
        <input
          type="number"
          className="form-control"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label>Stock</label>
        <input
          type="number"
          className="form-control"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {producto.id ? 'Guardar Cambios' : 'Registrar Producto'}
      </button>
    </form>
  );
}

export default ProductoForm;
