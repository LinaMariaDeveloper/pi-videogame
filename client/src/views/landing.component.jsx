import games from "../assets/videojuegos.jpg"
import {Link} from "react-router-dom"
import pokemon from '../assets/pokemon.jpg'

function Landing() {
  return (
    <div className="container">
      <div className="container-box">
        <div>
          <div className="title">Soy Gamer!</div>
          <p className="pr">Encontraras una gran coleccion de videjuegos, consulta sus caracteristicas,
            organizalos, filtralos y lo mejor, guarda la información de un videojuego creado
            por ti.
          </p>
          <Link className="button" to='/home'>¡Vamos a los videojuegos!</Link>
        </div>
        <div>
          <img src={pokemon} alt="" />
        </div>
      </div>
      <div className="container-box">
        <div>
          <img src={games} alt=""/>
        </div>
        <div>
        <p className="pl">Sabias que los videojuegos se remontan a los años de 1950, pero fue finalmente en los 70
          en donde se conocieron los primeros juegos dirigidos al publico, entre ellos el famoso Atari.
          Luego pasamos a Nintendo con su consola NES (¡Mi primer consola de juegos, tiempos aquellos!),
          seguimos con Sega con su Master System, SNES y ¡BAM! Sony con su PlayStation, despues de esto un
          monton de consolas cada vez más novedosas y juegos con mejores gráficas, grandes bandas sonoras,
          multijugador, juegos de telefono y todo lo que tenemos hoy en dia. 
        </p>
        </div>
      </div>
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