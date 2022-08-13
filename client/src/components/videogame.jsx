import { Link } from "react-router-dom";
import "./videogameBlock.css"
export default function Videogame({id, name, image, rating, Genre}){
    return <div className="container">
             <div className="card">
                <div className="box">
                    <div className="content">
                        <Link to={`/${id}`}>  
                        <h2>{Genre}</h2>
                        <h2>Rating:{rating}</h2>
                        <h3>{name}</h3>
                        <img  src={image} alt= {"image" + name}/>
                     </Link>
                 </div>
            </div>
        </div>
    </div>
}
