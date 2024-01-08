import { GET_GENRES, GET_NAME, GET_PLATFORMS, GET_VIDEOGAMES, POST_VIDEOGAME } from "./actions-type"

let initialState = { 
  allVideogames: [], 
  allGenres: [], 
  allPlatforms: [], 
  newVideogame: {},
  videogameName: []
}

function rootReducer(state = initialState, action){
  switch(action.type){
    case GET_VIDEOGAMES:
      return{
        ...state,
        allVideogames: action.payload
      }

    case GET_GENRES:
      return{
        ...state,
        allGenres: action.payload
      }
    
    case GET_PLATFORMS:
      return{
        ...state,
        allPlatforms: action.payload
      }
    
    case POST_VIDEOGAME:
      return {
        ...state,
        newVideogame: action.payload
      }
   
    case GET_NAME:
      return {
        ...state,
        videogameName: action.payload
      }
    default:
      return state
  }
}

export default rootReducer