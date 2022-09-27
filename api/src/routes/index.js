const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogameRouter = require("./videogame")
const genreRouter = require("./genre")
const platformRouter = require("./platform")

const router = Router();

router.use("/videogame", videogameRouter )
router.use("/platform", platformRouter )
router.use("/genre", genreRouter )

module.exports = router;
