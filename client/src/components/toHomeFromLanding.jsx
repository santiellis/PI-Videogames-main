import "./toHomeFromLanding.css"


export default function ToHomeFromLanding(){

    function redirect()
    {
    window.location.href="/home";
    }
        return <div >
        <h2>Welcome to the PI-Videogames </h2>
          <img src="https://media.wired.com/photos/627da1085d49787abdf713b4/master/pass/Pakistani-Gamers-Want-a-Seat-at-the-Table-Culture-shutterstock_1949862841.jpg"
                alt="Background" className="img_background" />
          <div >
        <button className="button-style4" name="To Home" onClick={redirect}>Home</button>
          </div>
        </div>
    
}

