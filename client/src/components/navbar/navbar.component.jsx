import { Link } from "react-router-dom"
import React from 'react';
import game from '../../assets/game.jpg'

function Navbar() {

  return (
    <div className="navbar">
      <div>
        <Link to="/">
          <img src={game} alt='' />
          <span>Landing</span>
        </Link>
      </div>
      <div>
        <Link to='/home'>Home</Link>
        <Link to="/search">Buscar Por Nombre</Link>
        <Link to="/form">Crear Videojuego</Link>
      </div>
    </div>
  );
}

export default Navbar;