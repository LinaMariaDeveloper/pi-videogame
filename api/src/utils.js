/**
 * transforma los resultados de la API de juego con la misma estructura de los de la base de datos
 * @param {*} game 
 * @returns 
 */
function parseAPIGames(game) {
  const { id, name, background_image, rating, platforms, released, genres, description } = game
  const platGame = platforms.map(platform => {
    const { name, id } = platform.platform
    return { name, id }
  })
  const genre = genres.map(gen => {
    const { name, id } = gen
    return { name, id }
  })
  return {
    id: `A${id}`, name, description, image: background_image, rating, platforms: platGame, released, genres: genre
  }
}
module.exports = parseAPIGames
