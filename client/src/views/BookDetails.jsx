import { useParams } from "react-router-dom";
import {useState, useEffect} from "react"


export default function BookDetails (){

    const {id} = useParams();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {

        async function getBookDetails(){

            setBook(null)
            setLoading(true)
            setError(null)

            try{
                const response = await fetch(`http://localhost:3000/api/books/${id}`)

                if(!response.ok){
                    throw new Error("Something went wrong.")
                }
                const data = await response.json()
                console.log(data)

                if(data.error){
                    throw new Error(data.error.message)
                }

                setBook(data)
                setLoading(false)
            }

            catch(err){
            setError(err.message)
            setLoading(false)
    
            }
        }

        getBookDetails()

    }, [id])

    

    return (
        <div>

        <p>Testing BookDetails page</p>
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
        </div>}
        
        </div>
    )
}