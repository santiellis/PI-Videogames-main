import { ASCENDENTE, DESCENDENTE } from "../../const/orderByName"
import {LOADING_TRUE,LOADING_FALSE, FETCH_VIDEOGAMES, FILTERED, SEARCH_VIDEOGAMES, SORT, DELETE_VIDEOGAME, FETCH_PLATFORM, FETCH_GENRE, CLEAR, CREATE_PAGINATION_ARRAY, CHANGE_PAGE} from "../actions"

const initialState = {
    videogames: [],
    allVideogamesSaved: [],
    orderedVideogames: [],
    filteredVideogame: [],
    searchedVideogame: [],
    genres: [],
    platforms: [],
    filteredGenre: [],
    filteredPlatform: [],
    paginationArray: [],
    currentPage: 1,
    currentSearch: "",
    currentOrder: ASCENDENTE,
    currentGenre: "Genre",
    currentPlatform: "Platform",
    loading: true
}


export default function reducer(state = initialState, action){
    
    // let allVideogamesSaved = [...state.allVideogamesSaved]
    // let videogame = [...state.videogames]
    let orderedVideogames = [...state.orderedVideogames]
    
    switch(action.type){
        case FETCH_VIDEOGAMES:

            return {
                ...state,
                videogames: action.payload,
                allVideogamesSaved: action.payload,
                orderedVideogames: action.payload
                
            }
            
            
            case FETCH_GENRE:

            return{
                    ...state,
                    genres: action.payload,
                    filteredGenre: action.payload,

            }
        case FETCH_PLATFORM:

                return{
                    ...state,
                    platforms: action.payload,
                    filteredPlatform: action.payload,
                }    

        case SEARCH_VIDEOGAMES:
            return {
                ...state,
                orderedVideogames: action.payload,
                searchedVideogame : action.payload,
                currentSearch: action.payload,
                currentPage: 1,
                currentOrder: ASCENDENTE,
                currentGenre: "Genre",
                currentPlatform: "Platform",

            }

        case SORT: 
            // console.log(...state.allVideogamesSaved)
        if(state.searchedVideogame.length === 0){
            let orderedByNameVideogames = [...state.allVideogamesSaved]
            
            if (action.payload === ASCENDENTE){
            orderedByNameVideogames = orderedByNameVideogames.sort((a,b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase() ){
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                return 0
            })}
            if (action.payload === DESCENDENTE){
                orderedByNameVideogames = orderedByNameVideogames.sort((a,b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()){
                    return action.payload === ASCENDENTE ? 1 : -1;
                }
                return 0;
            })}

            if (action.payload === "Rating Low to High"){
                
                orderedByNameVideogames = orderedByNameVideogames.sort(function (a, b) {
                    if (a.rating > b.rating) return 1;
                    if (b.rating > a.rating) return -1;
                    return 0;
                  })
            }

            if (action.payload === "Rating High to Low"){
                orderedByNameVideogames = orderedByNameVideogames.sort(function (a, b) {
                    if (a.rating > b.rating) return -1;
                    if (b.rating > a.rating) return 1;
                    return 0;
                  });
            }

            return {
                ...state,
                orderedVideogames: orderedByNameVideogames,
                currentOrder: action.payload,
                currentPage: 1

            }} else{
                let orderedByNameVideogames = [...state.searchedVideogame]
            
            if (action.payload === ASCENDENTE){
            orderedByNameVideogames = orderedByNameVideogames.sort((a,b) => {
                if (a.name < b.name ){
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                return 0
            })}
            if (action.payload === DESCENDENTE){
                orderedByNameVideogames = orderedByNameVideogames.sort((a,b) => {
                if (a.name > b.name){
                    return action.payload === ASCENDENTE ? 1 : -1;
                }
                return 0;
            })}

            if (action.payload === "Rating Low to High"){
                
                orderedByNameVideogames = orderedByNameVideogames.sort(function (a, b) {
                    if (a.rating > b.rating) return 1;
                    if (b.rating > a.rating) return -1;
                    return 0;
                  })
            }

            if (action.payload === "Rating High to Low"){
                orderedByNameVideogames = orderedByNameVideogames.sort(function (a, b) {
                    if (a.rating > b.rating) return -1;
                    if (b.rating > a.rating) return 1;
                    return 0;
                  });
            }

            return {
                ...state,
                orderedVideogames: orderedByNameVideogames,
                currentOrder: action.payload,
                currentPage: 1

            }
            }

        case CLEAR: 
          return {
            ...state,
            currentPage: 1
          }

        case DELETE_VIDEOGAME:
            return{
                ...state,
                videogames:action.payload
            }    
        
        case CREATE_PAGINATION_ARRAY:

            const pageSize = 15;
            let pageHolder = []

            for (let i = 0; i < state.filteredVideogame.length; i += pageSize) {
                                                //inicial    final
                const page = state.filteredVideogame.slice(i, i + pageSize);
                pageHolder.push(page)
            }

        
            return {
                ...state,
                paginationArray: pageHolder
            }
            

        case CHANGE_PAGE: 

            return {
                ...state,
                currentPage: action.payload
            }

        case FILTERED:
            let filteredVideogame = orderedVideogames

            let filters = {
                Genre: state.currentGenre,
                Platform: state.currentPlatform
            }


            for (let Key in action.payload){

                filters[Key] = action.payload[Key]
            }

            if(filters.Platform !== "Platform"){
                
                filteredVideogame = filteredVideogame.filter((videogame) =>{

                    for (let i = 0; i < videogame.Platforms.length; i++) { 
                        if (videogame.Platforms[i].name === filters.Platform){
                            return videogame
                        }
                    }
                    return 0
                })
            }

            if(filters.Genre !== "Genre"){
        
                filteredVideogame = filteredVideogame.filter((videogame) =>{
                    for (let i = 0; i < videogame.Genres.length; i++) {
                        if (videogame.Genres[i].name === filters.Genre){
                            return videogame
                        }
                    }
                    return 0
                })

            }

            return {
                ...state,
                currentGenre: filters.Genre,
                currentPlatform: filters.Platform,
                filteredVideogame: filteredVideogame,
                currentPage: 1

                
            }

            case LOADING_TRUE: return {
                ...state,
                loading: true,
            }
            
            case LOADING_FALSE: return{
                ...state,
                loading: false
            }

        default: 
            return state     
    }
}