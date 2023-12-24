import { GET_VIDEOGAMES } from "./actions"

let initialState = { allVideogames: [] }

function rootReducer(state = initialState, action){
  switch(action.type){
    case GET_VIDEOGAMES:
      return{
        ...state,
        allVideogames: action.payload
      }
      
    default:
      return state
  }
}

export default rootReducer