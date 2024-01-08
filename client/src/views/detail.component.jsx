import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Detail() {

  const { id } = useParams()
  const [videogame, setVideogame] = useState([])


  useEffect(() => {
    axios(`http://localhost:3001/videogames/${id}`).then(({ data }) => {
      if (data.name) {
        const videogameData = {
          id: data.id,
          name: data.name,
          image: data.image,
          released: data.released,
          rating: data.rating,
          description: data.description,
          genres: [],
          platforms: []
        }
        for (let genre of data.genres) {
          videogameData.genres.push(<span className="chip">{genre.name}</span>)
        }
        for (let platform of data.platforms) {
          videogameData.platforms.push(<span className="chip">{platform.name}</span>)
        }
        return setVideogame(videogameData);
      } else {
        window.alert('No hay personajes con ese ID');
        return setVideogame({});
      }
    });
  }, [id]);

  return (
    <div className="container center">
      <div className="card full">
        <img src={videogame.image} alt="" />
        <div className="card-content full">
          <div>
            <div >{videogame.genres}</div>
            <div className="title full">{videogame.name}</div>
            <div>Plataformas: {videogame.platforms}</div>
            <div>ID: {videogame.id}</div>
            <div>Lanzamiento: {videogame.released}</div>
            <div>Raking: {videogame.rating}</div>
            <div>Descripción:</div>
            <div className="scroll" dangerouslySetInnerHTML={{ __html: videogame.description }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;