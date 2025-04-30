import React from 'react';

const HomePage = () => {
  return (
    <div style={{
      backgroundColor: '#e0f7fa', // Un color de fondo suave
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' // Una ligera sombra
    }}>
      <h2 style={{
        color: '#00acc1', // Un color primario llamativo
        marginBottom: '15px'
      }}>
        ¡Bienvenido a la Botica Nova Salud! 🌟
      </h2>
      <p style={{
        fontSize: '1.1em',
        color: '#546e7a'
      }}>
        Descubre cómo estamos revolucionando la gestión de tu botica. Mantente al tanto de las últimas novedades en productos, ofertas especiales y nuestro compromiso con tu bienestar.
      </p>
      
      { <img src="/images/descarga.png" alt="Botica Nova Salud" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} /> }
    </div>
  );
};

export default HomePage;