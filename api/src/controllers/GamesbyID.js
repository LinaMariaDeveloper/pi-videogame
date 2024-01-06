require("dotenv").config()
const parseAPIGames = require('../utils')

const { KEY } = process.env
const axios = require('axios')
const { Videogame, Genres, Platforms } = require('../db.js')

const GamebyID = async (req, res) => {

  try {
    const reqId = req.params.id
    let result = null

    if (reqId.startsWith('A')) {
      const newId = reqId.slice(1)
      const { data } = await axios.get(`https://api.rawg.io/api/games/${newId}?key=${KEY}`)

      if (data) {
        result = parseAPIGames(data)
      }
    } else {
      result = await Videogame.findOne({ where: { id: reqId }, include: [Genres, Platforms] })
      
      if (!result) {
        res.status(404).json({ message: 'Not found in database' })
      }
    }
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = GamebyID

