import { useEffect, useState } from "react";
import SavedBookCard from "../components/SavedBookCard";

export default function SavedBooks() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getSavedBooks() {
      try {
        const result = await fetch(`${import.meta.env.VITE_API_URL}/api/saved`);
        if (!result.ok) {
          throw new Error("Could not fetch saved books");
        }
        const data = await result.json();
        setBooks(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
        setIsLoading(false);
      }
    }

    getSavedBooks();
  }, []);

  return (
    <>
      {isLoading && !error && <div>Loading books...</div>}
      {error && <div className="error-message">{error}</div>}
      {!isLoading && books.length === 0 && (
        <p className="info-message">No saved books yet</p>
      )}
      <div className="books-grid">
        {books &&
          books.map((book) => {
            return <SavedBookCard key={book.google_books_id} book={book} />;
          })}
      </div>
    </>
  );
}
