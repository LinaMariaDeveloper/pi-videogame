import './card.style.css';
import { Link } from "react-router-dom";

function Card({game}) {
  
  const { id, name, image, Genres } = game
  const gen = []

  for(let genre of Genres){
    gen.push(<span>{genre.name}</span>)
  }

  return (
    <div className="container-card">
      <div>
        <img className='image-card' src={image} alt='' />
      </div>
      <div>
        <Link to={`/detail/${id}`}>
          <span>{name}</span>
        </Link>
        <div>{gen}</div>
      </div>
    </div>
  );
}

export default Card;