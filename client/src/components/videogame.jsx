import { Link } from "react-router-dom";
import "./videogameBlock.css"
export default function Videogame({id, name, image, rating, genre}){
    return <div className="container">
             <div className="card">
                <div className="box">
                    <div className="content">
                        <Link to={`/${id}`}>  
                        <h2>Rating:{rating}</h2>
                        <h3>{name}</h3>
                        <img  src={image} alt= {"image" + name}/>
                        <h5>{genre + ""}</h5>
                     </Link>
                 </div>
            </div>
        </div>
    </div>
}
