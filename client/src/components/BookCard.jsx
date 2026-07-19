
import { useNavigate } from "react-router-dom"

export default function BookCard({book}){

    const navigate = useNavigate()

    return (
        <>
        <div onClick={() => navigate(`/bookdetails/${book.id}`)}>
        <h2>{book.volumeInfo.title}</h2>
        <p>{book.volumeInfo.authors?.[0]}</p>
        <p>{book.volumeInfo.publishedDate}</p>
        <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title}/>
        </div>
        </>
    )
}