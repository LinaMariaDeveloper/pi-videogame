require("dotenv").config()
const { KEY } = process.env
const axios = require('axios')
const { Videogame } = require('../db.js')

const GamebyID = async (req, res) => {

  try {
    const { id } = req.params
    const { data } = await axios.get(`https://api.rawg.io/api/games/${id}?key=${KEY}`)

  } catch (error) {

  }
}

module.exports = GamebyID

