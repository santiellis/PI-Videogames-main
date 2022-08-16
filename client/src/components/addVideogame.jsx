import axios from "axios"
import {  useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { fetchGenre, fetchPlatform } from "../store/actions"
import "./addVideogame.css"
export default function Videogame(){
    let [videogame, setVideogame] = useState({name: "",image: "", description: "", rating: 0, released: "", Genres: [], Platforms: []})
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms)
    console.log(videogame)
    let dispatch = useDispatch()
    
    
    useEffect(() => {
        dispatch(fetchGenre());
        dispatch(fetchPlatform());
      }, [dispatch])


    let history = useHistory()
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
        .catch(error => alert(error.response.data))
        
    }

const checkValue = () =>{
    if(videogame.name.length && videogame.image.length && videogame.Genres.length && videogame.description.length && videogame.released.length && videogame.Platforms.length){
        return false
    }else{return true}
}



  const selectGenre = (e) => {
    console.log(e)
    console.log(e.target[e.target.selectedIndex].id)

    setVideogame({
        ...videogame,
        Genres: [...videogame.Genres, e.target[e.target.selectedIndex].id],
      });

  };

  const selectPlatforms = (e) => {
    console.log(e.target.value)

    setVideogame({
        ...videogame,
        Platforms: [...videogame.Platforms,  e.target[e.target.selectedIndex].id],
      });

  };


  const handleDeleteGenres = (e) => {
    setVideogame({
      ...videogame,
      Genres: videogame.Genres.filter((genre) => genre !== e),
    });
  };

  const handleDeletePlatforms = (e) => {
    setVideogame({
      ...videogame,
      Platforms: videogame.Platforms.filter((platform) => platform !== e),
    });
  };


  useEffect(() => {
    console.log(videogame)
  }, [videogame])

    return <div id="formContainer">
         {  videogame   ?
              <>
      
            <form className="formItem" onSubmit={onSubmit}>
            <input onChange={onInput} type="text" name="name" placeholder="Name..."  value={videogame.name}/>
            <input onChange={onInput} type="text" name="image" placeholder="Image..."  value={videogame.image}/>
            <input onChange={onInput} type="text" name="description" placeholder="Details..."  value={videogame.description} />
            <input onChange={onInput} type="number" step={0.1} name="rating" placeholder="Rating..."  value={videogame.rating} />
            <input onChange={onInput} type="date" name="released"   value={videogame.released} />
            <div>
            <select
              onChange={(e) => selectGenre(e)}
                name="Genres"
            >
              <option hidden>Select Genre</option>
              {genres.map((e) => {
                return (
                  <option id={e.id} key={e.id} value={e.name}>
                    {e.name}
                  </option>
                );
              })}
            </select>  
            </div>
            <br/>
            <div className="Horizontal">
              {videogame.Genres.map((e) => {
                let nameGenre = genres.filter(genre => genre.id === parseInt(e))
                return (
                  <div key={e} className="Space">
                    <button
                      onClick={() => handleDeleteGenres(e)}
                    >
                      {nameGenre[0].name} x
                    </button>
                  </div>
                );
              })}
            </div>
           
            <div>
            <select
              onChange={(e) => selectPlatforms(e)}
                name="Platforms"
            >
              <option hidden>Select Platform</option>
              {platforms.map((e) => {
                return (
                  <option id={e.id} key={e.id} value={e.name}>
                   {e.name}
                  </option>
                );
              })}
            </select>  
            </div>
            <br/>
            <div className="Horizontal">
            {videogame.Platforms
              ? videogame.Platforms.map((e) => {
                let namePlatform = platforms.filter(platform => platform.id === parseInt(e))
                  return (
                    <div key={e} className="Space">
                      <button
                        onClick={() => handleDeletePlatforms(e)}
                      >
                        {namePlatform[0].name} x
                      </button>
                    </div>
                  );
                })
              : null}
          </div>

            <input type="submit" disabled={checkValue()} className={checkValue() === false ? "botonVerde" : "botonRojo"}/>
            </form>

        </> :
      <div>loading</div>

       
}
    </div>

}