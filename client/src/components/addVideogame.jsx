import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchGenre, fetchPlatform } from "../store/actions"
import "./addVideogame.css"
export default function Videogame(){
    let [videogame, setVideogame] = useState({name: "",image: "", description: "", rating: 0, released: ""})
    let history = useHistory()
    let dispatch = useDispatch
    function onInput(event) {
        event.preventDefault()
        if (event.target.name === "rating" ){
            if(event.target.value < 0){
                return setVideogame({
                    ...videogame,
                    [event.target.name]: 0
                })
              
            }
            if(event.target.value > 5){
                return setVideogame({
                    ...videogame,
                    [event.target.name]: 5
                })
            }
        }
        setVideogame({
            ...videogame,
            [event.target.name]: event.target.value
        })
    }
    function onSubmit(event) {
        event.preventDefault()
        axios.post("http://localhost:3001/api/Videogame/", videogame)
        .then(() =>{
            history.push("/home")
        })
        
    }

    return <div id="formContainer">
        <form className="formItem" onSubmit={onSubmit}>
                <input onChange={onInput} type="text" name="name" placeholder="Name..."  value={videogame.name}/>
                <input onChange={onInput} type="text" name="image" placeholder="Image..."  value={videogame.image}/>
                <input onChange={onInput} type="text" name="description" placeholder="Details..."  value={videogame.description} />
                <input onChange={onInput} type="number" step={0.1} name="rating" placeholder="Rating..."  value={videogame.rating} />
                <input onChange={onInput} type="date" name="released"   value={videogame.released} />
                <div>
                </div>
                <input type="submit"/>
            </form>
    </div>
}