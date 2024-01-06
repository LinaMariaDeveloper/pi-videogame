import './form.style.css';
import React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postVideogames, getGenres, getPlatforms } from '../../redux/actions';
import { Link } from "react-router-dom"
import validate from "../../utils/validation"

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
    platforms: []
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    release: "",
    rating: "",
    genres: "",
    platforms: ""
  })

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    dispatch(getPlatforms());
  }, []);


  function handleChange(event) {
    if (event.target.name === "genres" || event.target.name === "platforms") {
      let array = game[event.target.name];
      const currentValue = parseInt(event.target.value)

      if (event.target.checked) {
        array.push(currentValue)
      } else {
        array = array.filter(item => item !== currentValue)
      }

      setGame({
        ...game,
        [event.target.name]: array,
      });
    } else {
      setGame({
        ...game,
        [event.target.name]: event.target.value,
      });
    }

    setErrors(
      validate({
        ...game,
        [event.target.name]: event.target.value,
      })
    )
  }

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


    if (!obj.name || !obj.description || !obj.release || !obj.rating) {
      alert("Faltan datos por completar.")
      return
    }
    if (obj.genres.length === 0 || obj.platforms.length === 0) {
      alert("Faltan datos por completar .")
      return
    }

    dispatch(postVideogames(obj));
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
      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="name">Nombre</label>
        <input type="text" name="name" value={game.name} onChange={handleChange} />
        <div>{game.name.length}/50</div>
        {errors.name && (
          <h5 style={{ color: 'red' }}>
            <span>{errors.name}</span>
          </h5>
        )}
        <label className="label" htmlFor="description">Descripcion</label>
        <textarea name="description" value={game.description} onChange={handleChange} rows="8"></textarea>
        {errors.description && (
          <h5 style={{ color: 'red' }}>
            <span>{errors.description}</span>
          </h5>
        )}
        <label className="label" htmlFor="release">Fecha de Lanzamiento</label>
        <input type="date" name="release" value={game.release} onChange={handleChange} />
        {errors.release && (
          <h5 style={{ color: 'red' }}>
            <span>{errors.release}</span>
          </h5>
        )}
        <label className="label" htmlFor="rating">Raking</label>
        <input type="number" name="rating" min="0" max="5" value={game.rating} onChange={handleChange} />
        {errors.rating && (
          <h5 style={{ color: 'red' }}>
            <span>{errors.rating}</span>
          </h5>
        )}
        <label className="label" htmlFor="genres">Generos:</label>
        <div className='box'>
          {genres.map((gen) => (
            <div key={gen.id}>
              <input type="checkbox" name="genres" value={gen.id} onChange={handleChange} />
              {errors.genres && (
                <h5 style={{ color: 'red' }}>
                  <span>{errors.genres}</span>
                </h5>
              )}
              <label name={gen}>{gen.name}</label>
            </div>
          ))}
        </div>
        <label className="label" htmlFor="platforms">Plataformas</label>
        <div className='box'>
          {platforms.map((gen) => (
            <div key={gen.id}>
              <input type="checkbox" name="platforms" value={gen.id} onChange={handleChange} />
              {errors.platforms && (
                <h5 style={{ color: 'red' }}>
                  <span>{errors.platforms}</span>
                </h5>
              )}
              <label name={gen}>{gen.name}</label>
            </div>
          ))}
        </div>
        <label className="label" htmlFor="image">Imagen URL</label>
        <input type="text" name="image" value={game.image} onChange={handleChange} />
        {errors.image && (
          <h5 style={{ color: 'red' }}>
            <span>{errors.image}</span>
          </h5>
        )}
        <button type="submit">Crear</button>
      </form>
      <Link to="/home">
        <button className="back">Regresar</button>
      </Link>
    </div>
  );
}

export default Form;