require("dotenv").config()
const { KEY } = process.env
const axios = require('axios')
const { Videogame, Genres, Platforms } = require('../db')


const AllGames = async (req, res) => {
  
  const { orderby, asc, origin, genre } = req.query

  try {
    let dbGames = []
    if(origin === "bd" || origin === "all" ){
      dbGames = await Videogame.findAll({ include: [Genres, Platforms] })
    }

    let apiResults = []
    if (origin === "api" || origin === "all") {
      for (let page = 1; page <= 5; page++) {
        const { data } = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=20&page=${page}`)
        if (!data) {
          res.status(404).json({ message: 'videogames not found' })
          return
        }

        for(let result of data.results){
          for(let plat of result.platforms){
            let platformDB = await Platforms.findOne({ where: { id: plat.platform.id } })
            if(!platformDB){
              await Platforms.create({name: plat.platform.name, id: plat.platform.id})
            }
          }
        }

        const results = data.results.map(game => {
          const { id, name, background_image, rating, platforms, released, genres } = game
          const platGame = platforms.map(platform => {
            const { name, id } = platform.platform
            return { name, id }
          })
          const genre = genres.map(gen => {
            const { name, id } = gen
            return { name, id }
          })
          return {
            id: `A${id}`, name, image: background_image, rating, Platforms: platGame, released, Genres: genre
          }
        })
        apiResults = apiResults.concat(results)
      }
    }
    
    let apiBd = apiResults.concat(dbGames)

    if(genre !== "all"){
      apiBd = apiBd.filter((game) => {
        return game.Genres.map((gen) => gen.id).includes(parseInt(genre))
      })
    }

    const page = parseInt(req.query.page) || 1
    const start = (page - 1) * 15
    const end = start + 15
    const pagesCount = Math.ceil(apiBd.length / 15)


    apiBd.sort((a, b) =>  a[orderby] > b[orderby]? parseInt(asc) : -parseInt(asc));


    res.status(200).json({ results: apiBd.slice(start, end), page, pagesCount })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = AllGames