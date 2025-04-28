import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import InventarioPage from './pages/InventarioPage';
import VentasPage from './pages/VentasPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventario" element={<InventarioPage />} />
        <Route path="/ventas" element={<VentasPage />} />
      </Routes>
    </Router>
  );
}

export default App;
