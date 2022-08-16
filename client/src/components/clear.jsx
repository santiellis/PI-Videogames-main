import "./searchBar.css"
import "./order.jsx"
import "./searchByGenre"
import "./searchByPlatform"

export default function Clear(){

    function cleaning(){
            window.location.href="/home";
    }
    return  <button className="button-style2" name="To Home" onClick={cleaning}>Reset all searchs</button>
}
