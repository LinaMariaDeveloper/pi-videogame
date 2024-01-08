import React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postVideogames, getGenres, getPlatforms } from '../redux/actions';
import axios from 'axios';
import validate from "../utils/validation"

function Form() {
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.allGenres);
  const platforms = useSelector((store) => store.allPlatforms)
  const postgame = useSelector((store) => store.newVideogame)

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

    if(!postgame.error){
      setGame({
        name: "",
        description: "",
        image: "",
        release: "",
        rating: 0,
        genres: [],
        platforms: [],
      });
    }
  };

  return (
    <div className="container">
      <div className="title">¡CREA TU VIDEOJUEGO!</div>
      <div className='error'>{postgame.message}</div>
      <form onSubmit={handleSubmit}>
        <div className='form-field'>
          <label htmlFor="name">Nombre</label>
          <input id='name' type="text" name="name" value={game.name} onChange={handleChange} size="50" />
          <div className="error">{errors.name}</div>
        </div>
        <div className="form-field">
          <label htmlFor="release">Fecha de creación</label>
          <input id='release' type="date" name="release" value={game.release} onChange={handleChange} />
          <div className="error">{errors.release}</div>
        </div>
        <div className="form-field">
          <label htmlFor="rating">Raking</label>
          <input id='rating' size="13" type="number" name="rating" min="0" max="5" value={game.rating} onChange={handleChange} />
          <div className="error">{errors.rating}</div>
        </div>
        <div className="form-field">
          <label htmlFor="description">Descripcion</label>
          <textarea id='description' cols="50" name="description" value={game.description} onChange={handleChange} rows="8"></textarea>
          <div className="error">{errors.description}</div>
        </div>
        <div className="form-field">
          <label htmlFor="image">Imagen URL</label>
          <input id='image' size="50" type="text" name="image" value={game.image} onChange={handleChange} />
          <div className="error">{errors.image}</div>
        </div>
        <div className="form-field">
          <label>Generos</label>
          {genres.map((gen) => (
            <div key={gen.id} className='checkbox'>
              <input id="genres" type="checkbox" name="genres" value={gen.id} onChange={handleChange} />
              <label htmlFor="genres" name={gen}>{gen.name}</label>
            </div>
          ))}
          <div className='error'>{errors.genres}</div>
        </div>
        <div className="form-field">
          <label>Plataformas</label>
          {platforms.map((gen) => (
            <div key={gen.id} className='checkbox'>
              <input id="platforms" type="checkbox" name="platforms" value={gen.id} onChange={handleChange} />
              <label htmlFor="platforms" name={gen}>{gen.name}</label>
            </div>
          ))}
          <div className='error'>{errors.platforms}</div>
        </div>
        <button className="button" type="submit">Crear</button>
      </form>
    </div>
  );
}

export default Form;