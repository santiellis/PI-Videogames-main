import { useDispatch, useStore } from "react-redux"
import {ASCENDENTE, DESCENDENTE} from "../const/orderByName"
import { sort } from "../store/actions"
import "./searchBar.css"


export default function Order(){
   const dispatch = useDispatch()     
    const store = useStore()
    function onSelect(event) {
        dispatch(sort(event.target.value))
        
        console.log(store.getState().genre)
        }
        
    return <select id="dropdown" className="select-style" name="Order by Name" onChange={onSelect}>
        <option value={ASCENDENTE}>A-Z</option>
        <option value={DESCENDENTE}>Z-A</option>

    </select>
}


