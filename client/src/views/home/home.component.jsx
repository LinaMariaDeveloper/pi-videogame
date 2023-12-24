import { usseEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideogames } from "../../redux/actions"
import Navbar from "../../components/navbar/navbar.component"
import Cards from "../../components/cards/cards.component"
import './home.style.css';

function Home() {

  const dispatch = useDispatch()
  const allGames = useSelector((state)=> state.allVideogames)

  usseEffect(() =>{
    dispatch(getVideogames())
    }, [dispatch])
 
  
  return (
    <div>
      <Navbar/>
      <Cards allGames={allGames}/>
    </div>
  );
}

export default Home;