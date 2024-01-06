import './navbar.styles.css';
import { Link } from "react-router-dom"
import React from 'react';

function Navbar() {

  return (
    <div className='search'>
      <Link to="/">Landing</Link>
      <Link to="/search">
      <button>Buscar Por Nombre</button> 
      </Link>
      <Link to="/form">
        <button>Crear Videojuego</button>
      </Link>
    </div>
  );
}

export default Navbar;