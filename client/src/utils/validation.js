export default function validate (game){

  const errors = { 
    name: "",
    description: "",
    image: "",
    release: "",
    rating: "",
    genres: "",
    platforms: "",
  }
  
  if(!game.name){
    errors.name ="El nombre es requerido"
  } else if (game.name.length > 50){
    errors.name ="El nombre no puede tener mas de 50 caracteres"
  } 
  
  if(!game.description){
    errors.description ="La descripcion es requerida"
  } else if (game.description.length > 255){
    errors.description ="La descripción no puede tener mas de 255 caracteres"
  }

  if(!game.release){
    errors.release = "Requiere una fecha de creación"
  }

  if(game.rating > 5){
    errors.rating ="El rating no puede ser mayor a 5"
  } else if (game.rating < 0) {
    errors.rating ="El rating no debe ser menor a 0"
  }
  else if(!/[0-9]/.test(game.rating)){
    errors.rating ="Solo se permiten números"
  }

  if(!game.genres.length){
    errors.genres ="Debe seleccionar una opción "
  }

  if(!game.platforms.length){
    errors.platforms ="Debe seleccionar una opción "
  }

  if(!game.image){
    errors.image ="Debe poner una url de imagen"
  }else if(game.image.length >= 255){
    errors.image ="Longitud permitida 255 caracteres"
  }else if(!/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(game.image)){
    errors.image ="No es una url valida"
  }

  return errors;
}