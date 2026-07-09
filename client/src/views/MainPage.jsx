import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer.jsx"


export default function MainPage (){

    const [searchInput, setSearchInput] = useState("")
    const navigate = useNavigate();


    function handleSearch(e) {
        e.preventDefault()

        navigate(`/searchresults?q=${searchInput}`)




    }

    return (
        <>
        <p>Testing MainPage</p>
        <form onSubmit={(e) => handleSearch(e)}>
            <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} type="text" placeholder="Search for a title..."></input>
            <button type="submit">Search</button>
        </form>
        <Footer />

        </>
    )
}