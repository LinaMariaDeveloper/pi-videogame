require("dotenv").config()
const { KEY } = process.env
const axios = require('axios')
const { INTEGER } = require("sequelize")


const AllGames = async (req, res) => {
  
  try {
    let apiResults = []
    if (!apiResults.length) {
      for (let page = 1; page <= 5; page++) {
        const { data } = await axios.get(`https://api.rawg.io/api/games?key=${KEY}&page_size=20&page=${page}`)
        if (!data) {
          res.status(404).json({ message: 'videogames not found' })
          return
        }
        const results = data.results.map(game => {
          const { id, name, description, background_image, rating, platforms, released } = game
          const platGame = platforms.map(platform => {
            const { name, id } = platform.platform
            return { name, id }
          })
          return {
            id:`A${id}`, name, description, image: background_image, rating, platforms: platGame, released
          }
        })
        apiResults = apiResults.concat(results)
      }
    }
    const page  = parseInt(req.query.page) || 1
    const start = (page - 1) * 15
    const end = start + 15
    const pagesCount = Math.ceil(apiResults.length / 15)
    
    res.status(200).json({results: apiResults.slice(start, end), page, pagesCount })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


module.exports = AllGames