import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.title}>Botica Nova Salud</h1>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/inventario" style={styles.link}>Inventario</Link></li>
        <li><Link to="/ventas" style={styles.link}>Ventas</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
  },
  title: {
    color: 'white',
    margin: 0,
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '15px',
    margin: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default Navbar;
