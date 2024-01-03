import './form.style.css';
import React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postVideogames, getGenres, getPlatforms } from '../../redux/actions';
import { Link } from "react-router-dom"

function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.allGenres);
  const platforms = useSelector((store) => store.allPlatforms)

  const [game, setGame] = useState({
    name: "",
    description: "",
    image: "",
    release: "",
    rating: 0,
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    dispatch(getPlatforms());
  }, []);

  const changeInput = (e) => {
    if (e.target.name === "genres" || e.target.name === "platforms") {
    const array = game[e.target.name];
    setGame({
        ...game,
        [e.target.name]: array.concat(parseInt(e.target.value)),
      });
      console.log("HOLAAA")
      console.log(game)
    } else {
    setGame({
        ...game,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const obj = {
    name: game.name,
    description: game.description,
    image: game.image,
    release: game.release,
    rating: parseInt(game.rating),
    genres: [...new Set(game.genres)],
    platforms: [...new Set(game.platforms)],
    };

    
  
    if (!obj.name) {
        alert("Debe poner un nombre.")
        return
    }
    if (!obj.description) {
        alert("Debe agregar una descripción.")
        return
    }if (!obj.release) {
        alert("Debe poner un año.")
        return
    }if (obj.rating > 5 || obj.rating < 0) {
        alert("El rating debe ser un numero entre 0 y 5")
        return
    }

    dispatch(postVideogames(obj));
    e.target.reset();
    alert("Videojuego creado con exito");

    setGame({
        name: "",
        description: "",
        image: "",
        release: "",
        rating: 0,
        genres: [],
        platforms: [],
    });
};
  return (
    <div>
      <h1 className="title">CREA TU VIDEOJUEGO</h1>
      <form className="form" onChange={(e) => changeInput(e)} onSubmit={(e) => handleSubmit(e)}>
        <label className="label" htmlFor="name">Nombre</label>
        <input type="text" name="name" value={game.name}/>
        <label className="label" htmlFor="description">Descripcion</label>
        <input type="text" name="description" value={game.description}/>
        <label className="label" htmlFor="release">Fecha de Lanzamiento</label>
        <input type="date" name="release" value={game.release}/>
        <label className="label" htmlFor="rating">Raking</label>
        <input type="number" name="rating" value={game.rating}/>
        <label className="label" htmlFor="genres">Generos:</label>
        <div className='box'>
            {genres.map((gen) => (
                <div key={gen.id}>
                  <input type="checkbox" name="genres" value={gen.id}/>
                  <label name={gen}>{gen.name}</label>
                </div>
              ))}
        </div>
        <label className="label" htmlFor="platforms">Plataformas</label>
        <div className='box'>
            {platforms.map((gen) => (
                <div key={gen.id}>
                  <input type="checkbox" name="platforms" value={gen.id}/>
                  <label name={gen}>{gen.name}</label>
                </div>
              ))}
        </div>
        <label className="label" htmlFor="image">Imagen URL</label>
        <input type="text" name="image" value={game.image}/>
        <button type="submit">Crear</button>
      </form>
      <Link to="/home">
        <button className="back">Regresar</button>
      </Link>
    </div>
  );
}

export default Form;