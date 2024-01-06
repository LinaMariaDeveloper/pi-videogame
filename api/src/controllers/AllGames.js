require("dotenv").config()
const parseAPIGames = require('../utils')

const { KEY } = process.env
const axios = require('axios')
const { Videogame, Genres, Platforms } = require('../db')

async function createPlatformsDB(data) {
  for (let result of data.results) {
    for (let plat of result.platforms) {
      let platformDB = await Platforms.findOne({ where: { id: plat.platform.id } })
      if (!platformDB) {
        await Platforms.create({ name: plat.platform.name, id: plat.platform.id })
      }
    }
  }
}

const AllGames = async (req, res) => {

  const { orderby, asc, origin, genre } = req.query

  try {
    let allResults = []

    if (origin === "api" || origin === "all") {
      // recorre las primeras 5 páginas de la api de juegos y realiza las peticiones de datos
      for (let page = 1; page <= 5; page++) {
        const { data } = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=20&page=${page}`)
        if (!data) {
          res.status(404).json({ message: 'videogames not found' })
          return
        }

        await createPlatformsDB(data)

        const apiResults = data.results.map(parseAPIGames)
        allResults = allResults.concat(apiResults)
      }
    }

    if (origin === "bd" || origin === "all") {
      const dbResults = await Videogame.findAll({ include: [Genres, Platforms] })
      allResults = allResults.concat(dbResults)
    }

    // filtro por géneros
    if (genre !== "all") {
      allResults = allResults.filter((game) => {
        return game.genres.map((gen) => gen.id).includes(parseInt(genre))
      })
    }

    // paginación
    const page = parseInt(req.query.page) || 1
    const start = (page - 1) * 15
    const end = start + 15
    const pagesCount = Math.ceil(allResults.length / 15)

    // ordenamiento de resultados
    allResults.sort((a, b) => a[orderby] > b[orderby] ? parseInt(asc) : -parseInt(asc));

    res.status(200).json({ results: allResults.slice(start, end), page, pagesCount })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = AllGames
