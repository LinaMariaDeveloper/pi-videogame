require("dotenv").config()
const { KEY } = process.env
const axios = require('axios')
const { Genres } = require('../db')

const GenresAll = async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.rawg.io/api/genres?key=${KEY}`)

    for(let resul of data.results){
      let genreDB = await Genres.findOne({ where: {id: resul.id}})
      if(!genreDB){
        await Genres.create({name: resul.name, id: resul.id})
      }
    }

    const genresDB = await Genres.findAll()
    res.status(200).json(genresDB)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }

}

module.exports = GenresAll