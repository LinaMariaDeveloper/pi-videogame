require("dotenv").config()
const { KEY } = process.env
const axios = require('axios')
const { Op } = require('sequelize')
const { Videogame, Genres, Platforms } = require('../db.js')

const GamebyName = async (req, res) => {

  try {
    const { name } = req.query
    let resultAll = []

    if(name){
      resultAll = await Videogame.findAll({ where: { name: { [Op.iLike]: `%${name}%` } }, include: [Genres, Platforms] })
      const { data } = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${KEY}`)
  
      const resultsApi = data.results.map(game => {
        const { id, name, description, background_image, rating, platforms, released, genres } = game
        const platGame = platforms.map(platform => {
          const { name, id } = platform.platform
          return { name, id }
        })
        const genre = genres.map(gen => {
          const { name, id } = gen
          return { name, id }
        })
        return {
          id: `A${id}`, name, description, image: background_image, rating, Platforms: platGame, released, Genres: genre
        }
      })
  
      resultAll = resultAll.concat(resultsApi)
    }  
    res.status(200).json({ results: resultAll.slice(0, 16) })
    
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = GamebyName