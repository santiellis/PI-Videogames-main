import { useState } from "react"
import { useDispatch } from "react-redux";
import { searchVideogame } from "../store/actions"
import "./searchBar.css"
import "./order.jsx"
import "./searchByGenre"
import "./searchByPlatform"

export default function SearchBar() {
    const [search, setSearch] = useState('')
    let dispatch = useDispatch()
    function onSubmit(event) {
        event.preventDefault();
        dispatch(searchVideogame(search))
        document.getElementsByClassName("dropdown").selectedIndex = 0;
        document.getElementById("Form").reset();
    }

    function onInputText(event) {
        event.preventDefault();
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
