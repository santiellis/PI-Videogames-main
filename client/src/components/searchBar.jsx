import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { searchVideogame } from "../store/actions"
import "./searchBar.css"
import "./order.jsx"
import "./searchByGenre"
import "./searchByPlatform"

export default function SearchBar() {
    const [search, setSearch] = useState('')
    let searchData = useSelector((state) => state.currentSearch)
    console.log(searchData)

    let dispatch = useDispatch()
    function onSubmit(event) {
        event.preventDefault();
        dispatch(searchVideogame(search))
        document.getElementById("Form").reset();
    }

    function onInputText(event) {
        event.preventDefault();
        searchData = event.target.value
        console.log(searchData)
        setSearch(event.target.value)
    }

    return <nav id="myInput">
                <div className="wrap">
                    <form id="Form" onSubmit={onSubmit}>
                        <div className="search">
                            <input type="text" onChange={onInputText} className="searchTerm" placeholder="What are you looking for?" />
                            <button  type="submit"  className="searchButton">
                                <i>&#128269;</i>
                            </button>
                        </div>
                    </form>
                </div>
            </nav>



}
