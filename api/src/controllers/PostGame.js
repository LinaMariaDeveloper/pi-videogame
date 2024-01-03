const { Videogame, Genres, Platforms } = require('../db.js')

const PostGame = async (req, res) => {
  try {
    const { name, description, image, release, rating, platforms, genres } = req.body

    let gameCreated = await Videogame.create({
      name,
      description,
      image,
      release,
      rating
    })

    genres.forEach(async (genreFound) => {
      const genre = await Genres.findOne({ where: { id: genreFound } })
      await gameCreated.addGenre(genre)
    })

    
    platforms.forEach(async (platformFound) => {
      const platform = await Platforms.findOne({ where: { id: platformFound } })
      await gameCreated.addPlatform(platform)
    })

    res.status(200).json('Videogame created successfully')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = PostGame