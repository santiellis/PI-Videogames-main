import { useSelector } from "react-redux";
import "./searchBar.css"


export default function RedirectToAddVideogame(){
    let loadingCheck = useSelector((state) => state.loading)

    if(loadingCheck === true) {
        return <span></span>
      }

    function redirect()
    {
    window.location.href="/addVideogame";
    }
    return  <button className="button-style" name="Add Videogame" onClick={redirect}>Add Videogame</button>
}



