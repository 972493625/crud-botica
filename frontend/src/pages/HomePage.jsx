import React from 'react';
import { FaHeart, FaTag, FaLightbulb } from 'react-icons/fa';
import { BiPhone } from "react-icons/bi";

const HomePage = () => {
  // Estilos mejorados
  const styles = {
    container: {
      backgroundColor: '#f0f8ff',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      color: '#333',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    title: {
      color: '#007bff',
      marginBottom: '15px',
      fontSize: 'clamp(1.5em, 3vw, 2.5em)',
    },
    description: {
      fontSize: '1.2em',
      marginBottom: '20px',
      lineHeight: '1.6',
    },
    gallery: {
      display: 'flex',
      overflowX: 'auto',
      marginBottom: '20px',
      gap: '10px',
      padding: '10px 0',
      scrollbarWidth: 'none', // Para Firefox
      '&::-webkit-scrollbar': {
        display: 'none', // Para Chrome/Safari
      },
    },
    image: {
      width: '300px',
      height: '200px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      objectFit: 'cover',
      flexShrink: 0,
    },
    button: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '12px 24px',
      borderRadius: '5px',
      border: 'none',
      fontSize: '1.1em',
      cursor: 'pointer',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s ease',
    },
    contact: {
      marginTop: '20px',
      fontSize: '0.9em',
      color: '#777',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };

  // Manejar hover con estado o CSS-in-JS (aquí simplificado)
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        ¡Bienvenido a la Botica vida luz! 🌟
      </h2>
      <p style={styles.description}>
        <FaLightbulb style={{ marginRight: '5px' }} /> Descubre cómo estamos revolucionando la gestión de tu botica. <br />
        <FaTag style={{ marginRight: '5px' }} /> Mantente al tanto de las últimas novedades en productos y ofertas especiales. <br />
        <FaHeart style={{ marginRight: '5px' }} /> Nuestro compromiso con tu bienestar es nuestra prioridad.
      </p>

      {/* Galería de imágenes con placeholders reales */}
      <div style={styles.gallery}>
        <img
          src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          alt="Interior de farmacia"
          style={styles.image}
        />
        <img
          src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          alt="Farmacéutico ayudando a cliente"
          style={styles.image}
        />
        <img
          src="https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          alt="Medicamentos y productos"
          style={styles.image}
        />
      </div>

      <button 
        style={{
          ...styles.button,
          backgroundColor: isHovered ? '#218838' : '#28a745'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Ver Productos Destacados
      </button>
      <div style={styles.contact}>
        <BiPhone style={{ marginRight: '5px' }} />
        Contáctanos: +51 999 999 999
      </div>
    </div>
  );
};

export default HomePage;