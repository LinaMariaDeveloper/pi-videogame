require("dotenv").config()
const parseAPIGames = require('../utils')

const { KEY } = process.env
const axios = require('axios')
const { Op } = require('sequelize')
const { Videogame, Genres, Platforms } = require('../db.js')

const GamebyName = async (req, res) => {
  try {
    const { name } = req.query
    let allResults = []

    if (name) {
      allResults = await Videogame.findAll({ where: { name: { [Op.iLike]: `%${name}%` } }, include: [Genres, Platforms] })

      const { data } = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${KEY}`)

      const resultsApi = data.results.map(parseAPIGames)

      allResults = allResults.concat(resultsApi)
    }
    res.status(200).json({ results: allResults.slice(0, 16) })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = GamebyName