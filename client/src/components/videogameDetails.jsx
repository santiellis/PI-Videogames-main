import { useEffect, useState } from "react"
import axios from "axios"
import "./details.css"
import { useParams } from "react-router-dom"


export default function VideogameDetails(){
    const [genre, setGenre] = useState(null)
    const [platform, setPlatform] = useState(null)

    const [videogame, setVideogame] = useState(null)
    let {id} = useParams()
    useEffect(() =>{
        axios.get("http://localhost:3001/api/Videogame/" + id)
        .then((response) =>{
            setVideogame(response.data)
            console.log(response)
            setGenre(response.data.Genres.map((genre) =>{
               return genre.name
            }))

            setPlatform(response.data.Platforms.map((platform) =>{
                return platform.name
             }))
        })
        .catch((error) =>{
            console.log(error)
        })
        return () => {
            setVideogame(null)
        }
    }, [id])
    return  <div >

        {  videogame   ?
              <>
        <h2>{videogame.name}</h2>
        <div className="cat">
        <img src={videogame.image} alt= {"image" + videogame.name}/>
        </div>
        <div className="text" dangerouslySetInnerHTML={{__html: videogame.description}}/>
        <h3>{videogame.rating}</h3>
        <div>{genre + ""}</div>
        <h3>{videogame.released}</h3>
        <h3>{platform + " "}</h3>

        </> :
        <div>{platform}</div>
                 
        }
      </div>    
}