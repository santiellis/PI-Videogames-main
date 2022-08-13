import "./searchBar.css"


export default function RedirectToAddVideogame(){

    function redirect()
    {
    window.location.href="/addVideogame";
    }
    return  <button className="button-style" name="Add Videogame" onClick={redirect}>Add Videogame</button>
}



