const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
const AllGames = require('../controllers/AllGames')
const GamebyID = require('../controllers/GamesbyID')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", AllGames)
router.get("/videogames/:id", GamebyID)


module.exports = router;
