import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchVideogame } from "../store/actions"
import Videogame from "./videogame"
import "./videogamesBlocks.css"

export default function Videogames(){

    let pagination = useSelector((state) => state.paginationArray)
    let currentPage = useSelector((state) => state.currentPage)
    let dispatch = useDispatch()

    useEffect(() =>{
        dispatch(fetchVideogame())
    }, [dispatch])


    
    if(pagination[0]){
        return <div className="container">
            {pagination[currentPage -1].map((videogame) =>{ 
                return <Videogame key={videogame.id} 
                id={videogame.id} 
                name={videogame.name} 
                image={videogame.image} 
                rating={videogame.rating} 
                genre={videogame.Genres.map((minigenre, index) => minigenre.name)}/>
    })}

            </div>
    
    }else{
        return <div>loading</div>
    
}}