import { useNavigate } from "react-router-dom"

export default function SavedBookCard({book}){

    const navigate = useNavigate()

    return (
        
        <div onClick={() => navigate(`/bookdetails/${book.google_books_id}`)}>
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <img src={book.thumbnail} alt={book.title}/>
        </div>
        
    )
}