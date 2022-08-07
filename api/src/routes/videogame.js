const { Router } = require('express');
const {Videogame, Genre, Platform} = require("./../db")
const {Op} = require("sequelize")
const axios = require('axios')
const router = Router();
const key = process.env.API_KEY

router.get("/", async (req,res,next) => {
    try {
        let DBPromiseGames = await Videogame.findAll({
                order: [
                    ['name', 'ASC'],
                ],
                include:[ Genre, Platform],
            })
       Promise.all([
        DBPromiseGames
       ])
       .then((response) => {
        const [
            DBGames
        ] = response
        let allVideogames = [...DBGames]
        res.send(allVideogames)
       })
       .catch(error => next(error))
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req,res,next) => {
    try {
       const id = req.params.id
       if (Genre.id === Videogame.genreId){
         let game = await Videogame.findByPk(
            id, 
            {include: Genre,
             include: Platform   
            }
            )
        res.status(201).send(game)
    }
   } catch (error) {
    next(error)
   }
})

router.post("/", async (req,res,next) => {
    try {
       const {name, image, description, rating, released} = req.body
       const searchByName = await Videogame.findOne({ where: { name: name } });
    if (searchByName === null) {
        Videogame.findAll({
               
                order: [
                    ['id', 'ASC'],
                ],
         }).then((response) => {
            let lastVideogameInOrderAsc = response.pop()
            let id = lastVideogameInOrderAsc.id 
            id++
            return Videogame.create({
                    id,
                    name,
                    image,
                    description,
                    rating,
                    released,
                })
            .then((newVideogame) =>{
                res.status(201).send(newVideogame)
            })
           })
    }else {
  res.status(400).send("Ya existe ese Videojuego")
}
   } catch (error) {
    next(error)
   }
})

router.post("/:VideogameId/genre/:GenreId", async (req,res,next) => {
    try {
        const {VideogameId, GenreId} = req.params
        const videogame = await Videogame.findByPk(VideogameId)
        await videogame.addGenre(GenreId)
        res.status(200).send("JOIN WITH POST /genre and /videogame")
    } catch (error) {
        next(error)
    }
})

router.post("/:VideogameId/platform/:PlatformId", async (req,res,next) => {
    try {
        const {VideogameId, PlatformId} = req.params
        const videogame = await Videogame.findByPk(VideogameId)
        await videogame.addPlatform(PlatformId)
        res.status(200).send("JOIN WITH POST /platform and /videogame")
    } catch (error) {
        next(error)
    }
})

router.put("/:id", async (req,res,next) => {
    try {
        let id = req.params.id
        let {name, image, genre,description,rating,released} = req.body
        await Videogame.update({name, image, genre,description,released,rating},{
            where:{
                    id,
        }
        })
        res.status(200).send("Actualizado Correctamente")

    } catch (error) {
        next(error)
        res.status(400).send("No se actualizo ")
    }
})

router.delete("/:id", async (req,res,next) => {
   try {
    let id = req.params.id
     await Videogame.destroy({
        where: {
            id,
        }
    });
     res.status(200).send("Se borro el Videojuego correctamente")
   } catch (error) {
    next(error)
    res.status(418).send("No se pudo borrar Videojuego")
   }

})

module.exports = router;
