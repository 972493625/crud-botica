// src/App.jsx
import React from 'react';
import ProductList from './components/ProductList';

function App() {
  return (
    <div>
      <h1>Sistema de Gestión de Botica "Nova Salud"</h1>
      <ProductList />
      {/* Aquí irán los demás componentes */}
    </div>
  );
}

export default App;