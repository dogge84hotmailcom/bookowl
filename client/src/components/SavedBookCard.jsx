import { useNavigate } from "react-router-dom"

export default function SavedBookCard({book}){

    const navigate = useNavigate()

    return (
        
        <div className="book-card" onClick={() => navigate(`/bookdetails/${book.google_books_id}`)}>
            <img src={book.thumbnail} alt={book.title}/>
        </div>
        
    )
}