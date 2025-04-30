import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBoxes, FaCashRegister } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.title}>💊 Botica Nova Salud</h1>
      <ul style={styles.navLinks}>
        <li>
          <Link to="/" style={styles.link}>
            <FaHome style={styles.icon} />
            Home
          </Link>
        </li>
        <li>
          <Link to="/inventario" style={styles.link}>
            <FaBoxes style={styles.icon} />
            Inventario
          </Link>
        </li>
        <li>
          <Link to="/ventas" style={styles.link}>
            <FaCashRegister style={styles.icon} />
            Ventas
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#2c3e50',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  title: {
    color: 'white',
    margin: 0,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '25px',
    margin: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'color 0.3s ease',
  },
  icon: {
    fontSize: '1.2rem',
  },
};

export default Navbar;
