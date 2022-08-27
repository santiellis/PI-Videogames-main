import "./searchBar.css"
import "./order.jsx"
import "./searchByGenre"
import "./searchByPlatform"
import { useSelector } from "react-redux"

export default function Clear(){
    let loadingCheck = useSelector((state) => state.loading)
    if(loadingCheck === true) {
        return <span></span>
      }    
    function cleaning(){
            window.location.href="/home";
    }
    return  <button className="button-style2" name="To Home" onClick={cleaning}>Reset all searchs</button>
}
