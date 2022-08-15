import { ASCENDENTE } from "../../const/orderByName"
import {FETCH_VIDEOGAMES, FILTERED, SEARCH_VIDEOGAMES, SORT, DELETE_VIDEOGAME, SEARCH_BYGENRE, SEARCH_BYPLATFORM, FETCH_PLATFORM, FETCH_GENRE, SORT_RATING, CLEAR, CREATE_PAGINATION_ARRAY, CHANGE_PAGE} from "../actions"

const initialState = {
    videogames: [],
    allVideogamesSaved: [],
    orderedVideogames: [],
    filteredVideogame: [],
    genre: "",
    filteredGenre: [],
    platform: [],
    filteredPlatform: [],
    paginationArray: [],
    currentPage: 1,
    currentOrder: ASCENDENTE,
    currentGenre: "Genre",
    currentPlatform: "Platform",
    currentRating: "Rating",
}


export default function reducer(state = initialState, action){
    
    let allVideogamesSaved = [...state.allVideogamesSaved]
    let videogame = [...state.videogames]
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
            // console.log(action.payload)

            return{
                    ...state,
                    genre: action.payload,
                    filteredGenre: action.payload,

            }
        case FETCH_PLATFORM:
            // console.log(action.payload)
                return{
                    ...state,
                    platform: action.payload,
                    filteredPlatform: action.payload,
                }    

        case SEARCH_VIDEOGAMES:
            return {
                ...state,
                videogames:action.payload
            }

        case SORT: 
            let orderedByNameVideogames = [...state.allVideogamesSaved]

            orderedByNameVideogames = orderedByNameVideogames.sort((a,b) => {
                if (a.name < b.name){
                    return action.payload === ASCENDENTE ? -1 : 1;
                }
                if (a.name > b.name){
                    return action.payload === ASCENDENTE ? 1 : -1;
                }
                return 0;
            })
            return {
                ...state,
                orderedVideogames: orderedByNameVideogames,
                currentOrder: action.payload

            }

        case SORT_RATING: 
           let sortByRating
            if (action.payload === "Low to High"){
                
                sortByRating = state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) return 1;
                    if (b.rating > a.rating) return -1;
                    return 0;
                  })
            }else{
                sortByRating = state.videogames.sort(function (a, b) {
                    if (a.rating > b.rating) return -1;
                    if (b.rating > a.rating) return 1;
                    return 0;
                  });
            }
            
          return {
            ...state,
            videogames: sortByRating.map((e) => e),
          };
        
        
        case CLEAR: 
          console.log(initialState)
          return {
            ...state,
          }

        case DELETE_VIDEOGAME:
            return{
                ...state,
                videogames:action.payload
            }    
        
        case CREATE_PAGINATION_ARRAY:
            // console.log(action.payload)
            const pageSize = 15;
            let pageHolder = []

            for (let i = 0; i < state.filteredVideogame.length; i += pageSize) {
                                                //inicial    final
                const page = state.filteredVideogame.slice(i, i + pageSize);
                pageHolder.push(page)
            }
            // console.log("paginado ", pageHolder, allVideogamesSaved)
        
            return {
                ...state,
                paginationArray: pageHolder
            }

        case CHANGE_PAGE: 
        console.log("PAGE CHANGE", action.payload)
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

            let key, value
             for (let Key in action.payload){
                key = Key
                value = action.payload[Key]
                filters[Key] = action.payload[Key]
            }

            if(filters.Platform !== "Platform"){
                
                filteredVideogame = filteredVideogame.filter((videogame) =>{
                    console.log("vidya", videogame)
                    for (let i = 0; i < videogame.Platforms.length; i++) { 
                        if (videogame.Platforms[i].name === filters.Platform){
                            return videogame
                        }
                    }
                })
            }

            if(filters.Genre !== "Genre"){
        
                filteredVideogame = filteredVideogame.filter((videogame) =>{
                    for (let i = 0; i < videogame.Genres.length; i++) {
                        if (videogame.Genres[i].name === filters.Genre){
                            return videogame
                        }
                    }
                })
            }

            return {
                ...state,
                currentGenre: filters.Genre,
                currentPlatform: filters.Platform,
                filteredVideogame: filteredVideogame
                
            }

        default: 
            return state     
    }
}