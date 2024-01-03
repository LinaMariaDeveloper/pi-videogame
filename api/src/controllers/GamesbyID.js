require("dotenv").config()
const { KEY } = process.env
const axios = require('axios')
const { Videogame, Genres, Platforms} = require('../db.js')

const GamebyID = async (req, res) => {

  try {
    const reqId = req.params.id
    let result = null

    if (reqId.startsWith('A')) {
      const newId = reqId.slice(1)
      const { data } = await axios.get(`https://api.rawg.io/api/games/${newId}?key=${KEY}`)

      if (data) {
        const { id, name, description, background_image, rating, platforms, released, genres } = data
        const platGame = platforms.map(platform => {
          const { name, id } = platform.platform
          return { name, id }
        })
        const genre = genres.map(gen => {
          const { name, id } = gen
          return { name, id }
        })
        result = {
          id: `A${id}`, name, description, image: background_image, rating, Platforms: platGame, released, Genres: genre
        }
      }
    } else { 
      result = await Videogame.findOne({ where: {id: reqId}, include: [Genres, Platforms]})
      if(!result){
        res.status(404).json({ message: 'Not found in database' })
      }
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = GamebyID

