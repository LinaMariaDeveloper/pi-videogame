import { Link } from "react-router-dom";

function Card({ game }) {

  const { id, name, image, genres } = game
  const gen = []

  for (let genre of genres) {
    gen.push(<span className="chip">{genre.name}</span>)
  }

  return (
    <Link to={`/detail/${id}`}>
    <div className="card">
      <img src={image} alt="" />
      <div className="card-content">
        <div>
          <div>
            <div>{gen}</div>
          </div>
          <div>{name}</div>
        </div>
      </div>
    </div>
    </Link>
    // <div className="container">
    //   <div>
    //     <img src={image} alt='' />
    //   </div>
    //   <div>
    //     <Link to={`/detail/${id}`}>
    //       <span>{name}</span>
    //     </Link>
    //     <div>{gen}</div>
    //   </div>
    // </div>
  );
}

export default Card;