import "./searchBar.css"


export default function Clear(){

    function redirect(e){
    e.preventDefault()
    
    }
    return  <button className="button-style2" name="To Home" onClick={redirect}>Clear</button>
}
