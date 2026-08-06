import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {Search} from "lucide-react"


export default function MainPage (){

    const [searchInput, setSearchInput] = useState("")
    const navigate = useNavigate();


    function handleSearch(e) {
        e.preventDefault()

        navigate(`/searchresults?q=${searchInput}`)

    }

    return (
        <>
        
        <form onSubmit={(e) => handleSearch(e)}>
            <div className="search-container">
            <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} type="text" placeholder="Search for a title..."></input>
            <Search />
            </div>
            <button type="submit">Search</button>
        </form>
        <button className="savedbooks-btn-mainpage" type="button" onClick={() => navigate(`/savedbooks`)}>Saved Books</button>
        

        </>
    )
}