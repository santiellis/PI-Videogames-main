import { ASCENDENTE } from "../../const/orderByName"
import {FETCH_VIDEOGAMES, SEARCH_VIDEOGAMES, SORT, DELETE_VIDEOGAME, SEARCH_BYGENRE, SEARCH_BYPLATFORM, FETCH_PLATFORM, FETCH_GENRE, SORT_RATING, CLEAR} from "../actions"

const initialState = {
    videogames: [],
    filteredVideogames: [],
    genre: "",
    filteredGenre: [],
    platform: [],
    filteredPlatform: [],
    filtered: []

}


export default function reducer(state = initialState, action){
    let filteredVideogames = [...state.filteredVideogames]
    let videogame = [...state.videogames]

    switch(action.type){
        case FETCH_VIDEOGAMES:
        console.log(action.payload)

            return {
                ...state,
                videogames: action.payload,
                filteredVideogames:action.payload,
            }


        case FETCH_GENRE:
            console.log(action.payload)

            return{
                    ...state,
                    genre: action.payload,
                    filteredGenre: action.payload,

            }
        case FETCH_PLATFORM:
            console.log(action.payload)
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
        case SEARCH_BYGENRE: 
        let filtered = [...state.filtered]
        let genre 
        if (action.payload.data[0].Videogames.name === filteredVideogames.name){
            genre = action.payload.data[0].Videogames
        }
        return {
            ...state,
            genre: action.payload.genreName,
            filtered: [...filtered, action.payload.genreName],
            filteredVideogames: genre,
            videogames: genre
        }
        case SEARCH_BYPLATFORM: 
        console.log(action.payload)
        console.log(videogame)
        let platform 
        if (action.payload[0].Videogames.name === filteredVideogames.name ){
            platform = action.payload[0].Videogames
        }

            return {
                ...state,
                filteredVideogames: platform,
                videogames: platform

            }

        case SORT: 
            let orderedByNameVideogames = [...state.videogames]

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
                videogames: orderedByNameVideogames,

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

        default: 
            return state     
    }
}