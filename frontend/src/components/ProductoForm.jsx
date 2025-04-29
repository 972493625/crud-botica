import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductoForm({ cargarProductos, productoEditar, limpiarProductoEditar }) {
  const [producto, setProducto] = useState({
    nombre: '',
    codigo_barras: '',
    precio_compra: '',
    precio_venta: '',
    stock: '',
    stock_minimo: '10',  // Valor por defecto
    fecha_caducidad: '',
    categoria_id: '',
    proveedor_id: '',
  });

  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar "Cargando..."

  // Cargar categorías y proveedores solo una vez
  useEffect(() => {
    const cargarDatosMaestros = async () => {
      try {
        const categoriasRes = await axios.get('http://localhost:3000/api/categorias');
        const proveedoresRes = await axios.get('http://localhost:3000/api/proveedores');
        setCategorias(categoriasRes.data);
        setProveedores(proveedoresRes.data);
        setLoading(false); // Ya cargó
      } catch (error) {
        console.error("Error al cargar datos maestros:", error);
        alert('Error al cargar categorías y proveedores ❌');
        setLoading(false);
      }
    };
    cargarDatosMaestros();
  }, []);

  // Cada vez que cambia productoEditar
  useEffect(() => {
    if (productoEditar) {
      setProducto({
        nombre: productoEditar.nombre || '',
        codigo_barras: productoEditar.codigo_barras || '',
        precio_compra: productoEditar.precio_compra || '',
        precio_venta: productoEditar.precio_venta || '',
        stock: productoEditar.stock || '',
        stock_minimo: productoEditar.stock_minimo || '10',
        fecha_caducidad: productoEditar.fecha_caducidad || '',
        categoria_id: productoEditar.categoria_id || '',
        proveedor_id: productoEditar.proveedor_id || '',
        id: productoEditar.id // muy importante para saber si es edición
      });
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
        await axios.put(`http://localhost:3000/api/products/${producto.id}`, producto);
        alert('Producto actualizado exitosamente ✅');
      } else {
        await axios.post('http://localhost:3000/api/products', producto);
        alert('Producto registrado exitosamente ✅');
      }
      // Resetear formulario
      setProducto({
        nombre: '',
        codigo_barras: '',
        precio_compra: '',
        precio_venta: '',
        stock: '',
        stock_minimo: '10',
        fecha_caducidad: '',
        categoria_id: '',
        proveedor_id: '',
      });
      limpiarProductoEditar();
      cargarProductos();
    } catch (error) {
      console.error(error);
      alert('Error al guardar el producto ❌. Detalles: ' + error.message);
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
        <label>Código de Barras</label>
        <input
          type="text"
          className="form-control"
          name="codigo_barras"
          value={producto.codigo_barras}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Precio de Compra</label>
        <input
          type="number"
          className="form-control"
          name="precio_compra"
          value={producto.precio_compra}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Precio de Venta</label>
        <input
          type="number"
          className="form-control"
          name="precio_venta"
          value={producto.precio_venta}
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

      <div className="mb-3">
        <label>Stock Mínimo</label>
        <input
          type="number"
          className="form-control"
          name="stock_minimo"
          value={producto.stock_minimo}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label>Fecha de Caducidad</label>
        <input
          type="date"
          className="form-control"
          name="fecha_caducidad"
          value={producto.fecha_caducidad}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Categoría</label>
        <select
          className="form-select"
          name="categoria_id"
          value={producto.categoria_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label>Proveedor</label>
        <select
          className="form-select"
          name="proveedor_id"
          value={producto.proveedor_id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione Proveedor</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id} value={proveedor.id}>
              {proveedor.nombre}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        {producto.id ? 'Guardar Cambios' : 'Registrar Producto'}
      </button>
    </form>
  );
}

export default ProductoForm;
