import { useDispatch, useSelector } from "react-redux"
import {ASCENDENTE, DESCENDENTE} from "../const/orderByName"
import { sort, createPaginationArray, filtered } from "../store/actions"
import "./searchBar.css"


export default function Order(){
   const dispatch = useDispatch()     
    let order = useSelector((state) => state.currentOrder)
    let loadingCheck = useSelector((state) => state.loading)

    function onSelect(event) {
        dispatch(sort(event.target.value))
        dispatch(filtered())
        dispatch(createPaginationArray())
        }
   
        
if(loadingCheck === true) {
            return <span></span>
          }

    return <select id="dropdown" className="select-style" name="Order by Name" onChange={onSelect} value={order}>
        <option value={ASCENDENTE}>A-Z</option>
        <option value={DESCENDENTE}>Z-A</option>
        <option value="Rating Low to High">Rating Low to High</option>
        <option value="Rating High to Low">Rating High to Low</option>

    </select>
}


