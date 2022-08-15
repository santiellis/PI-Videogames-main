import { useDispatch } from "react-redux";
import { createPaginationArray, filtered } from "../store/actions"
import "./searchBar.css"


export default function SearchByGenre(){
    let dispatch = useDispatch()
    function onChange(event) {
        dispatch(filtered({Genre: event.target.value}))
        dispatch(createPaginationArray())
        }
        // const genreSelected = 0
    return  <select id="dropdown" className="select-style2"  onChange={onChange}>
                <option hidden>Genre</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Arcade">Arcade</option>
                <option value="Board Games">Board Games</option>
                <option value="Card">Card</option>
                <option value="Casual">Casual</option>
                <option value="Educational">Educational</option>
                <option value="Family">Family</option>
                <option value="Fighting">Fighting</option>
                <option value="Indie">Indie</option>
                <option value="Massively Multiplayer">Massively Multiplayer</option>
                <option value="Platformer">Platformer</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Racing">Racing</option>
                <option value="RPG">RPG</option>
                <option value="Shooter">Shooter</option>
                <option value="Simulation">Simulation</option>
                <option value="Sports">Sports</option>
                <option value="Strategy">Strategy</option>
    </select>

}