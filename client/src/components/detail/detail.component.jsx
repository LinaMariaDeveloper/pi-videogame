import "./detail.style.css"
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Detail() {

  const {id} = useParams()
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
          for(let genre of data.Genres){
            videogameData.genres.push(<span>{genre.name}</span>)
          }
          for(let platform of data.Platforms){
            videogameData.platforms.push(<span>{platform.name}</span>)
          }
          return setVideogame(videogameData);
        } else {
          window.alert('No hay personajes con ese ID');
          return setVideogame({});
        }
      });
    }, [id]);
  
  return (
    <div className="detail-container">
        <div className="details">
          <img className="detail-image" src={videogame.image} alt='' />
          <Link to="/home">
            <button>Regresar</button>
          </Link>
        </div>
        <div className="infogame-container">
          <div>
            <div>
              <h2>{videogame.name}</h2>
            </div>
            <div>
              <span>{videogame.id}</span>
            </div>
            <div>
              <span>{videogame.rating}</span>
            </div>
            <div>
              <span>{videogame.released}</span>
            </div>
            <div>
              <span>{videogame.genres}</span>
            </div>
            <div>
              <span>{videogame.platforms}</span>
            </div>
            <div>
              <span>{videogame.description}</span>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Detail;