import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {fetchVideogame} from "../store/actions"
import Videogame from "./videogame"
import "./videogamesBlocks.css"

export default function Videogames(){
    let videogames = useSelector((state) => state.videogames)
    let dispatch = useDispatch()
    useEffect(() =>{
        dispatch(fetchVideogame())
    }, [dispatch])
    return <div className="container">
        {videogames.map((videogame) =>{
            return <Videogame key={videogame.id} id={videogame.id} name = {videogame.name} image = {videogame.image} rating={videogame.rating} genre={videogame.Genres}/>
        })}
        </div>
}