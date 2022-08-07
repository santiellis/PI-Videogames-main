const { Router } = require('express');
const {Genre, Videogame, Platform} = require("../db")
const axios = require('axios')
const router = Router();

router.get("/", (req,res,next) => {
    try {
        let dbPromisePlatform = Platform.findAll({
            order: [
                ['name', 'ASC'],
            ],
            include: Videogame,
             })
        Promise.all([
            dbPromisePlatform
        ])
        .then((response) => {
         const [
             dbPlaform
         ] = response
         let allPlatform = [...dbPlaform]
         res.send(allPlatform)
        })
        .catch(error => next(error))
        
    } catch (error) {
        next(error)
    }
 })


 router.post("/", async (req,res,next) => {
     try{
         const {name} = req.body
         const searchByName = await Platform.findOne({ where: { name: name } });
         if (searchByName === null) {
        Platform.findAll({
                order: [
                    ['id', 'ASC'],
                ],
         }).then((response) => {
            let lastPlatformInOrderAsc = response.pop()
            let id = lastPlatformInOrderAsc.id 
            id++
            return Platform.create({name, id})
            .then((newPlatform) =>{
                res.status(201).send(newPlatform)
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
        let respuesta = await Platform.update({name},{
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
       if (Platform.id === Videogame.platformId){
         let platform = await Platform.findByPk(
            id, 
            {include: Videogame,}
            )
        res.status(201).send(platform)
    }
   } catch (error) {
    next(error)
   }
})

router.delete("/:id", async (req,res,next) => {
    try {
     let id = req.params.id
      await Platform.destroy({
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
