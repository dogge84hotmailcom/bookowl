
import { useNavigate } from "react-router-dom"

export default function BookCard({book}){

    const navigate = useNavigate()

    return (
        
        <div className="book-card" onClick={() => navigate(`/bookdetails/${book.id}`)}>
            {/*<h2>{book.volumeInfo.title}</h2>*/}
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title}/>
        </div>
        
    )
}