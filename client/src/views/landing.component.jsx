import Lina from "../assets/lina.jpg"
import {Link} from "react-router-dom"

function Landing() {
  return (
    <div className="container">
      <div className="info-project">
        <div>PROJECT</div>
        <div></div>
      </div>
      <div className="info-lina">LINA</div>
      {/* <h1 className='title'>LANDING PAGE</h1>
      <div className='landing-container'>
        <img src={Lina} alt="" width="400px"/>
        <div>
          <p>¿Quieres saber de mi?</p>
          <p>¡Perfecto!, soy Lina María Muñoz Mosquera</p>
          <p>Te resento mi proyecto individual de Videogames. 
           Soy estudiante de Desarrollo Web FullStack en SoyHenry</p>
          <p>En este proyecto encontraras una lista de videojuegos, podras 
            crear tu propio videojuego, revisar el detalle y ordenar los videojuegos
            encontrados</p>
        </div>
      </div>
      <div className='button-home'>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div> */}
    </div>
  );
}

export default Landing;