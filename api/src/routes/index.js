const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const AllGames = require('../controllers/AllGames')
const GamebyID = require('../controllers/GamesbyID')
const GamebyName = require('../controllers/GamesbyName')
const PostGame = require('../controllers/PostGame')
const GenresAll = require('../controllers/GenresAll')
const PlatformAll = require('../controllers/PlatformAll')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames/name", GamebyName)
router.get("/videogames", AllGames)
router.get("/videogames/:id", GamebyID)
router.get("/genres", GenresAll)
router.get("/platforms", PlatformAll)
router.post('/videogames', PostGame )


module.exports = router;
