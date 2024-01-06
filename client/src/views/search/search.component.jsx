import './search.styles.css';
import Cards from "../../components/cards/cards.component"
import { useEffect, useState} from "react"
import { getvideogameName } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"

function Search() {
  const dispatch = useDispatch()
  const dataGames = useSelector((state)=> state.videogameName)
  const [ search, setSearch ] = useState("")
  
  function handleChange(event){
    setSearch(event.target.value)
 }

  function onSearch (){
    dispatch(getvideogameName(search))
  }

  if(dataGames.results && dataGames.results.length === 0){
    alert("No se encontraron juegos.")
  }

  return (
    <div className="Search-container">
      <div className='Search'>
        <input value={search} placeholder='Buscar' onChange={handleChange}/>
        <button onClick={onSearch}>Buscar</button>
        <Link to="/home">
          <button>Home</button>
        </Link>
      </div>
      <Cards games={dataGames.results}/>
    </div>
  );
}

export default Search;