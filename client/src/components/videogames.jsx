import { React } from 'react';
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchVideogame, loading_false } from "../store/actions"
import Videogame from "./videogame"
import "./videogamesBlocks.css"
import loader from "./LoadingScreen.gif"
import './loading.css'

export default function Videogames(){

    let pagination = useSelector((state) => state.paginationArray)
    let currentPage = useSelector((state) => state.currentPage)
    let loadingCheck = useSelector((state) => state.loading)
    let dispatch = useDispatch()

    useEffect(() =>{
        dispatch(fetchVideogame())
        setTimeout(() =>{dispatch(loading_false())}, 4000)

    }, [dispatch])


    
    if(loadingCheck === false && pagination[0]){
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
        return (
            <div className='loader-container'>
                <img src={loader} alt=' '/>
            </div>
        );
    
}}