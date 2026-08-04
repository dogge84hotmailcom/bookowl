import {useEffect, useState} from "react"
import SavedBookCard from "../components/SavedBookCard"



export default function SavedBooks (){

    const [books, setBooks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

useEffect(()=> {

    async function getSavedBooks(){

        try{
        const result = await fetch("http://localhost:3000/api/saved")
            if(!result.ok){
                throw new Error("Could not fetch saved books")
            }
            const data = await result.json()
            setBooks(data)
            setIsLoading(false)
    
    }

    catch(err){
        console.log(err.message)
        setError(err.message)
        setIsLoading(false)
    }
    }

    getSavedBooks();
    
}, [])

    return (
        <>
        
        {isLoading && !error && <div>Loading books...</div>}
        {error && <div>{error}</div>}
        {!isLoading && books.length === 0 && <p>No saved books yet</p>}
        {books && books.map(book => {
            return <SavedBookCard key={book.google_books_id} book={book}/>
        })}
        </>
    )
}