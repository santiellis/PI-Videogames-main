const { Router } = require('express');
const {Genre, Videogame} = require("../db")
const axios = require('axios')
const router = Router();

router.get("/", (req,res,next) => {
    try {
        let DBPromiseGenre = Genre.findAll({
            order: [
                ['name', 'ASC'],
            ],
            include: Videogame,
             })
        Promise.all([
         DBPromiseGenre
        ])
        .then((response) => {
         const [
             DBGenre
         ] = response
         let allGenres = [...DBGenre]
         res.send(allGenres)
        })
        .catch(error => next(error))
        
    } catch (error) {
        next(error)
    }
 })


 router.post("/", async (req,res,next) => {
     try{
         const {name, image_background } = req.body
         const searchByName = await Genre.findOne({ where: { name: name } });
         if (searchByName === null) {
        Genre.findAll({
                order: [
                    ['id', 'ASC'],
                ],
         }).then((response) => {
            let lastGenreInOrderAsc = response.pop()
            let id = lastGenreInOrderAsc.id 
            id++
            return Genre.create({name, image_background, id})
            .then((newGenre) =>{
                res.status(201).send(newGenre)
            })
           })
    } else {
    res.status(400).send("Ya existe ese genero")
    }}
    catch(error){
        next(error)
    }
   
   
})

router.put("/:id", async (req,res,next) => {
    try {
        let id = req.params.id
        let {name} = req.body
        let respuesta = await Genre.update({name},{
            where:{
            id
        }
        })
        res.status(200).send(respuesta)
    } catch (error) {
        next(error)
        res.status(400).send("No se actualizo ")
    }
})

router.get("/:id", async (req,res,next) => {
    try {
       const id = req.params.id
       if (Genre.id === Videogame.genreId){
         let genre = await Genre.findByPk(
            id, 
            {include: Videogame,}
            )
        res.status(201).send(genre)
    }
   } catch (error) {
    next(error)
   }
})

router.delete("/:id", async (req,res,next) => {
    try {
     let id = req.params.id
      await Genre.destroy({
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
