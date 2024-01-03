import axios from "axios"
import {GET_VIDEOGAMES, GET_GENRES, POST_VIDEOGAME, GET_PLATFORMS, GET_NAME} from "./actions-type"

const getVideogames = (page, orderby, asc, origin, genre) =>{
  const endpoint = `http://localhost:3001/videogames`
  return (dispatch) => {
    axios.get(endpoint, {
      params: {
        page,
        orderby,
        asc,
        origin,
        genre
      }
    }).then(({data}) =>{
      return dispatch({
        type: GET_VIDEOGAMES,
        payload: data
      })
    })
  }
}

const getGenres = () =>{
  const endpoint = 'http://localhost:3001/genres'
  return (dispatch) => {
    axios.get(endpoint).then(({data}) => {
      return dispatch({
        type: GET_GENRES,
        payload: data
      })
    })
  }
}

const getPlatforms = () =>{
  const endpoint = 'http://localhost:3001/platforms'
  return (dispatch) => {
    axios.get(endpoint).then(({data}) => {
      return dispatch({
        type: GET_PLATFORMS,
        payload: data
      })
    })
  }
}


const postVideogames = (obj) => {
  const endpoint = 'http://localhost:3001/videogames';
  return (dispatch) => {
     axios.post(endpoint, obj).then(({ data }) => {
        return dispatch({
           type: POST_VIDEOGAME,
           payload: data,
        });
     });
  };
};

const getvideogameName = (name) => {
  const endpoint = `http://localhost:3001/videogames/name?name=${name}`
  return (dispatch) => {
    axios.get(endpoint).then(({data}) => {
      return dispatch({
        type: GET_NAME,
        payload: data,
      })
    })
  }
}


export { getVideogames, getGenres, postVideogames, getPlatforms, getvideogameName}