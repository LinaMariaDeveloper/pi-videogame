import Cards from "../components/cards.component"
import { useEffect, useState} from "react"
import { getvideogameName } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";

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

  return (
    <div className="container">
      <div className="toolbar">
        <input value={search} placeholder='Buscar' onChange={handleChange}/>
        <button className="button" onClick={onSearch}>Buscar</button>
      </div>
      <Cards games={dataGames.results}/>
    </div>
  );
}

export default Search;