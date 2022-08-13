import axios from "axios"
export const FETCH_VIDEOGAMES = "FETCH_VIDEOGAMES"
export const FETCH_GENRE = "FETCH_GENRE"
export const FETCH_PLATFORM = "FETCH_PLATFORM"
export const SEARCH_VIDEOGAMES = "SEARCH_VIDEOGAMES"
export const SEARCH_BYPLATFORM = "SEARCH_BYPLATFORM"
export const SEARCH_BYGENRE = "SEARCH_BYGENRE"
export const SORT = "SORT"
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME"
export const CLEAR = "CLEAR"
export const SORT_RATING = "SORT_RATING"
// const {
//     HTTPHOST
//   } = process.env





export function fetchVideogame(){
    return function(dispatch){
        axios.get( "http://localhost:3001/api/Videogame/")
        .then((videogames) =>{
            dispatch({
                type: FETCH_VIDEOGAMES,
                payload: videogames.data, 
            })
        
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}

export function searchVideogame(search){
    return function(dispatch){
        axios.get( "http://localhost:3001/api/Videogame?name=" + search)
        .then((videogames) =>{
            dispatch({
                type: SEARCH_VIDEOGAMES,
                payload: videogames.data
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}

export function fetchPlatform(){
    return function(dispatch){
        axios.get( "http://localhost:3001/api/platform/")
        .then((platform) =>{
            dispatch({
                type: FETCH_PLATFORM,
                payload: platform.data
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}


export function search_ByGenre(value){
    return function(dispatch){
        axios.get( "http://localhost:3001/api/Genre?name=" + value)
        .then((genre) =>{
            dispatch({
                type: SEARCH_BYGENRE,
                payload: {data: genre.data, genreName: value}


            })

        })
        .catch((error) =>{
            console.log(error)
        })
    }
}

export function fetchGenre(){
    return function(dispatch){
        axios.get( "http://localhost:3001/api/Genre/")
        .then((genre) =>{
            dispatch({
                type: FETCH_GENRE,
                payload: genre.data
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}

export function deleteVideogame(id){
    return function(dispatch){
        axios.delete( "http://localhost:3001/api/Videogame/" + id)
        .then((videogame) =>{
            dispatch({
                type: DELETE_VIDEOGAME,
                payload: videogame.data
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}

export function search_ByPlatform(value){
    return function(dispatch){
        axios.get( "http://localhost:3001/api/platform?name=" + value)
        .then((platform) =>{
            dispatch({
                type: SEARCH_BYPLATFORM,
                payload: platform.data
            })
        })
        .catch((error) =>{
            console.log(error)
        })
    }
}

export function sort(order) {
    return{
        type: SORT,
        payload: order
    }
}

export function sortByRating(order) {
    return{
        type: SORT_RATING,
        payload: order
    }
}


export function clear(payload){
    return {
        type: CLEAR,
        payload
    }
}