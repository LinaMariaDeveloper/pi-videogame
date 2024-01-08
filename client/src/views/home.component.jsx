import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGenres, getVideogames } from "../redux/actions"
import Cards from "../components/cards.component"


function Home() {

  const dispatch = useDispatch()
  const dataGames = useSelector((state) => state.allVideogames)
  const genres = useSelector((state) => state.allGenres)

  const [order, setOrder] = useState(1)
  const [item, setItem] = useState("name")
  const [origin, setOrigin] = useState("all")
  const [genre, setGenres] = useState("all")

  function handleOrigin(event) {
    setOrigin(event.target.value)
    dispatch(getVideogames(1, item, order, event.target.value, genre))
  }

  function handleGenre(event) {
    setGenres(event.target.value)
    dispatch(getVideogames(1, item, order, origin, event.target.value))
  }

  function handleOrder(event) {
    setOrder(event.target.value)
    dispatch(getVideogames(dataGames.page, item, event.target.value, origin, genre))
  }

  function handleItem(event) {
    setItem(event.target.value)
    dispatch(getVideogames(dataGames.page, event.target.value, order, origin, genre))
  }

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    dispatch(getVideogames(1, item, order, origin, genre))
  }, [dispatch])

  function handlerNext() {
    dispatch(getVideogames(dataGames.page + 1, item, order, origin, genre))
  }

  function handlerBack() {
    if (dataGames.page > 1) {
      dispatch(getVideogames(dataGames.page - 1, item, order, origin, genre))
    }
  }


  return (
    <div className="container">
      <div className="options">
        <select value={origin} onChange={handleOrigin}>
          <option value="all">Cualquier Origen</option>
          <option value="api">API</option>
          <option value="bd">BD</option>
        </select>
        <select value={genre} onChange={handleGenre}>
          <option value="all">Todos los Generos</option>
          {genres.map((gen) => (
            <option value={gen.id}>{gen.name}</option>
          ))}
        </select>
      </div>
      <div className="options">
        <select value={item} onChange={handleItem}>
          <option value="rating">Orden por raking</option>
          <option value="name">Orden por nombre</option>
        </select>
        <select value={order} onChange={handleOrder}>
          <option value="1">Acendente</option>
          <option value="-1">Descendente</option>
        </select>
      </div>
      <Cards games={dataGames.results} />
      <div className="pagination">
        {dataGames.page > 1 && (
          <button className="button" onClick={handlerBack}>Atrás</button>
        )}
        <span>Página {dataGames.page} de {dataGames.pagesCount}</span>
        {dataGames.page < 7 && (
          <button className="button" onClick={handlerNext}>Siguiente</button>
        )}
      </div>
    </div>
  );
}

export default Home;