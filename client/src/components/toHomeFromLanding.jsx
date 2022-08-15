import "./toHomeFromLanding.css"


export default function ToHomeFromLanding(){

    function redirect()
    {
    window.location.href="/home";
    }
    return  <button className="button-style4" name="To Home" onClick={redirect}>Home</button>
}

