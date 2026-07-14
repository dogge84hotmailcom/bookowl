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
                setError(null)
                setBooks([])

                try {
            const response = await fetch(`http://localhost:3000/api/books/search?q=${query}`)

             if(!response.ok) {
                throw new Error("Something went wrong.")
            }
            
            const data = await response.json()

            if(data.error){
                throw new Error(data.error.message)
            }
            console.log(data)

           

            setBooks(data.items)
            setIsLoading(false)


        }

        catch (err){
            setError(err.message)
            setIsLoading(false)
        }
        }

        fetchBooks()

    },[query])

    return (
        <>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {books && books.map((book) => (
            <BookCard key={book.id} book={book}/>
        ))}
        </>

    )
}