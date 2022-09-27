import axios from "axios"
export const FETCH_VIDEOGAMES = "FETCH_VIDEOGAMES"
export const FETCH_GENRE = "FETCH_GENRE"
export const FETCH_PLATFORM = "FETCH_PLATFORM"
export const SEARCH_VIDEOGAMES = "SEARCH_VIDEOGAMES"
export const SORT = "SORT"
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME"
export const CLEAR = "CLEAR"
export const SORT_RATING = "SORT_RATING"
export const CREATE_PAGINATION_ARRAY = "CREATE_PAGINATION_ARRAY"
export const CHANGE_PAGE = "CHANGE_PAGE"
export const FILTERED = "FILTERED"
export const LOADING_FALSE = "LOADING_FALSE"
export const LOADING_TRUE = "LOADING_TRUE"

export function fetchVideogame(){
    return async function(dispatch){
        axios.get( "http://localhost:3001/api/Videogame/")
        .then((videogames) =>{
            dispatch({
                type: FETCH_VIDEOGAMES,
                payload: videogames.data, 
            })
            dispatch(filtered())
            dispatch(createPaginationArray())
        
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
            console.log(videogames.data)
            dispatch(filtered())
            dispatch(createPaginationArray())
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

export function createPaginationArray(payload){
    return {
        type: CREATE_PAGINATION_ARRAY,
        payload,
    }
}

export function changePage(payload){
    return{
        type: CHANGE_PAGE,
        payload
    }
}

export function filtered(payload) {
    return {
        type: FILTERED,
        payload
    }
}

export function loading_false(payload){
    return {
        type: LOADING_FALSE,
        payload
    }
}

export function loading_true(payload){
    return{
        type: LOADING_TRUE,
        payload
    }
}