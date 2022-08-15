import { useDispatch, useSelector, useStore } from "react-redux"
import {ASCENDENTE, DESCENDENTE} from "../const/orderByName"
import { sort, createPaginationArray, filtered } from "../store/actions"
import "./searchBar.css"


export default function Order(){
   const dispatch = useDispatch()     
    const store = useStore()
    let order = useSelector((state) => state.currentOrder)


    function onSelect(event) {
        dispatch(sort(event.target.value))
        dispatch(filtered())
        dispatch(createPaginationArray())
        
        
        console.log()
        }
        
    return <select id="dropdown" className="select-style" name="Order by Name" onChange={onSelect} value={order}>
        <option value={ASCENDENTE}>A-Z</option>
        <option value={DESCENDENTE}>Z-A</option>

    </select>
}


