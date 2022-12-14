require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { default: axios } = require('axios');
const {
  DB_USER, DB_PASSWORD, DB_HOST,API_KEY, DB_NAME
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
// Aca vendrian las relaciones
// Product.hasMany(Reviews);
const { Videogame, Genre, Platform } = sequelize.models;

Videogame.belongsToMany(Genre, {through: "VideoGenre"})
Genre.belongsToMany(Videogame, {through: "VideoGenre"})

//Tablas Intermedias

Videogame.belongsToMany(Platform, {through: "VideoPlatform"})
Platform.belongsToMany(Videogame, {through: "VideoPlatform"})



const fillGenre = async (params) => {
  try {
    let genresApi =  await axios.get('https://api.rawg.io/api/genres?key=' + API_KEY )
    let datosGenre = genresApi.data.results
    let datosOrdenadosGenre = datosGenre.sort((a,b) => {
      return a.id - b.id
    }).map((genre) =>{
      return {
          id: genre.id,
          name: genre.name,
          image: genre.image_background,
      }
    })
    console.log("Fetcheando generos...")

    await Genre.bulkCreate(datosOrdenadosGenre)
      console.log("Fetcheadisimos esos generos :)")
    fillVideogames()
    
  } catch (error) {
    console.log(error)
  }

}

const fillVideogames = async (params) => {
  try {
    for (let i = 1; i < 6; i++) {
      
      let videogamesApi =  await axios.get('https://api.rawg.io/api/games?key=' + API_KEY + '&page=' + i)
      //API Request
      
      let datosVideogames = videogamesApi.data.results
      let datosOrdenadosVideogames = datosVideogames.sort((a,b) => {
        return a.id - b.id
      })
      console.log("Creando juegos")
      for (let i = 0; i < datosOrdenadosVideogames.length; i++) {
        let videogame = datosOrdenadosVideogames[i]
        let platformId = videogame.platforms.map((platform) =>  {
          return platform.platform.id 
        })
        let platformName = videogame.platforms.map((platform) =>  {
          return platform.platform.name 
        })
        let onePlatformId = 0
        let onePlatformName = ""
        for (let j = 0; j < platformId.length; j++) {
          onePlatformId = platformId[j]
          onePlatformName = platformName[j]
          await fillPlatform(onePlatformId, onePlatformName)  
        }
      
        let videogameDescription = await axios.get('https://api.rawg.io/api/games/'+  videogame.id +'?key=' + API_KEY)
         const createVideogame = await Videogame.create({
                  id: videogame.id,
                  name: videogame.name,
                  image: videogame.background_image,
                  description: videogameDescription.data.description ,
                  rating: videogame.rating,
                  released: videogame.released,
                 
              })
            await createVideogame.setGenres( videogame.genres.map((genre) => genre.id))
            await createVideogame.setPlatforms(videogame.platforms.map((platforms) => platforms.platform.id ))}
          console.log("Ze finish")
    }
  } catch (error) {
    console.log(error)
  }
}
  


const fillPlatform = async (platformId, platformName) => {
  try {
    
    let onePlatformId = platformId
    let onePlatformName = platformName

    let datosOrdenadosPlatform = {
      id : onePlatformId,
      name: onePlatformName,
    }
    console.log("Fetcheando plataformas...")
      const finishedFetchingPlatforms = await Platform.findOrCreate({where: datosOrdenadosPlatform})
    console.log("Fetcheadisimas esas plataformas :)")
  } catch (error) {
    console.log(error)
  }
}

fillGenre()
//Call the function fillGenre

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
