import "./searchBar.css"
import "./order.jsx"
import "./searchByGenre"
import "./searchByPlatform"

export default function Clear(){

    function cleaning(e){
    e.preventDefault()
    document.getElementById("dropdown").selectedIndex = 0;
    
    }
    return  <button className="button-style2" name="To Home" onClick={cleaning}>Clear</button>
}
