const { Platforms } = require('../db')

const PlatformAll = async (req, res) => {

  try {
    let platformDB = await Platforms.findAll()
    res.status(200).json(platformDB)   
  } catch (error) {
    res.status(404).json({ message: error.message })    
  }
}

module.exports = PlatformAll