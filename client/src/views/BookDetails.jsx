import { useParams, useNavigate } from "react-router-dom";
import {useState, useEffect} from "react"


export default function BookDetails (){

    const {id} = useParams();

    const navigate = useNavigate();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [isSaved, setIsSaved] = useState(false)

    function handleSimilar(){

        console.log(book.volumeInfo.categories)

        // Remove categories that are too general
        if(book.volumeInfo.categories){
            const searchString = book.volumeInfo.categories
            .map(category => category.split(" / "))
            .flat()
            .filter(word => !word.includes("General") && !word.includes("Fiction") && !word.includes("Women")
        && !word.includes("Nonfiction") && !word.includes("Juvenile"))

            const unique = [...new Set(searchString)]

            const query = unique.join(" ").replace(/&/g, "").replace(/\s+/g, " ").trim()
            console.log(query)
            navigate(`/searchresults?q=${query}`)
            
        }
        else {
            navigate(`/searchresults?q=inauthor:${book.volumeInfo.authors?.[0]}`)
        }
        
    }

    useEffect(() => {

        async function getBookDetails(){

            setBook(null)
            setLoading(true)
            setError(null)

            try{
                const response = await fetch(`http://localhost:3000/api/books/${id}`)

                if(!response.ok){
                    throw new Error("Could not find book details")
                }
                const data = await response.json()
                console.log(data)

                if(data.error){
                    throw new Error(data.error.message)
                }

                setBook(data)
                setLoading(false)
                {id}
            }

            catch(err){
            setError(err.message)
            setLoading(false)
    
            }
        }

        async function checkIfSaved(){

            try{
                
                const response = await fetch(`http://localhost:3000/api/saved/${id}`)
                if(!response.ok){
                    throw new Error("Could not check if title is saved already")
                }
                const data = await response.json()

                setIsSaved(data.isSaved)
            }

            catch(err){
                setError(err.message)
            }
        }

        getBookDetails()
        checkIfSaved()

    }, [id])

    async function handleSave(){


            try {
                const result = await fetch("http://localhost:3000/api/saved", {
            
            method: 'POST',
        headers: {
        
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({
            google_books_id: book.id,
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors?.[0],
            thumbnail: book.volumeInfo.imageLinks?.thumbnail
        })
        })
        console.log(result)
        if(!result.ok) throw new Error("Could not save book")
            setIsSaved(true)
            }

            catch(err){
                console.error(err.message)
                setError(err.message)
            }

            
    }

    async function handleDelete(){

        try {
            const result = await fetch(`http://localhost:3000/api/saved/${book.id}`, {
                method: 'DELETE'
            })
            if(!result.ok) throw new Error("Could not delete title")
                setIsSaved(false)
        }

        catch(err){
            console.log(err.message)
            setError(err.message)
        }

        
    }

    

    return (
        <div>

        {loading && <p>Loading book...</p>}
        {error && <p>{error}</p>}
        {book && 
        <div>
        <h1>{book.volumeInfo.title}</h1>
        <p>{book.volumeInfo.subtitle}</p>
        <h2>{book.volumeInfo.authors?.[0]}</h2>
        <p>{book.volumeInfo.publishedDate}</p>
        <p>{book.volumeInfo.description}</p>
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title}/>
        <div>
            { !isSaved && <button onClick={() => handleSave()}>Save</button>}
            { isSaved && <button onClick ={() => handleDelete()}>Delete</button>}
            <button onClick={() => handleSimilar()}>Find similar</button>
        </div>
        </div>
        
        }
        
        </div>
    )
}