import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react"
import BookCard from "../components/BookCard"

export default function SearchResults (){

    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")

    const [isLoading, setIsLoading] = useState(true)
    const [books, setBooks] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=> {

        
            async function fetchBooks (){
                setIsLoading(true)

                try {
            const response = await fetch(`http://localhost:3000/api/books/search?q=${query}`)
            const data = await response.json()

            if(!response.ok) {
                throw new Error("Something went wrong.")
            }

            setBooks(data.items)
            setIsLoading(false)


        }

        catch (err){
            setError(err.message)
        }
        }

        fetchBooks()

    },[query])

    return (
        <>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {books.map((book) => (
            <BookCard key={book.id} book={book}/>
        ))}
        </>

    )
}