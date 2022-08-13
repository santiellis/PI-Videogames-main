import "./searchBar.css"


export default function RedirectHome(){

    function redirect()
    {
    window.location.href="/";
    }
    return  <button className="button-style" name="To Home" onClick={redirect}>Home</button>
}



