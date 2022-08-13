import { useDispatch } from "react-redux"
import { sortByRating } from "../store/actions"
import "./searchBar.css"


export default function OrderByRating(){
   const dispatch = useDispatch()     
    function onSelect(event) {
        dispatch(sortByRating(event.target.value))
        }
        
    return <select id="dropdown" className="select-style4" name="Order by Rating" onChange={onSelect}>
        <option hidden>Rating</option>
        <option value="Low to High">Low to High</option>
        <option value="High to Low">High to Low</option>
    </select>
}
