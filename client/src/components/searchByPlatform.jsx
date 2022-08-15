import { useDispatch } from "react-redux";
import { createPaginationArray, filtered } from "../store/actions"
import "./searchBar.css"



export default function SearchByPlatform(){

    let dispatch = useDispatch()
    function onChange(event) {
        dispatch(filtered({Platform: event.target.value}))
        dispatch(createPaginationArray())
        }

    return  <select  id="dropdown" className="select-style3"  onChange={onChange}>
                <option hidden>Platform</option>
                <option value="Android">Android</option>
                <option value="Dreamcast">Dreamcast</option>
                <option value="iOS">iOS</option>
                <option value="Linux">Linux</option>
                <option value="macOS">macOS</option>
                <option value="Nintendo">Nintendo 3DS</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="PC">PC</option>
                <option value="PlayStation 2">PlayStation 2</option>
                <option value="PlayStation 3">PlayStation 3</option>
                <option value="PlayStation 4">PlayStation 4</option>
                <option value="PlayStation 5">PlayStation 5</option>
                <option value="PS Vita">PS Vita</option>
                <option value="Web">Web</option>
                <option value="Wii U">Wii U</option>
                <option value="Xbox">Xbox</option>
                <option value="Xbox 360">Xbox 360</option>
                <option value="Xbox One">Xbox One</option>
                <option value="Xbox Series S/X">Xbox Series S/X</option>
    </select>

}