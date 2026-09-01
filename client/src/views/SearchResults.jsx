import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [isLoading, setIsLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [loadMoreError, setLoadMoreError] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    async function fetchBooks(retry = true) {
      setIsLoading(true);
      setError(null);
      setBooks([]);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/books/search?q=${query}&startIndex=0`,
        );

        if (!response.ok) {
          throw new Error("Something went wrong.");
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error.message);
        }
        console.log(data);

        setBooks(
          (data.items ?? []).filter(
            (book) =>
              book.volumeInfo.imageLinks?.thumbnail &&
              book.volumeInfo.description,
          ),
        );
        setIsLoading(false);
        setStartIndex((prev) => prev + 10);
      } catch (err) {
        if (retry) {
          setTimeout(() => fetchBooks(false), 1000);
        }
        setError(err.message);
        setIsLoading(false);
      }
    }

    fetchBooks();
  }, [query]);

  async function loadMoreBooks() {
    console.log(startIndex);
    setIsLoading(true);
    setLoadMoreError(null);

    try {
      console.log(
        `${import.meta.env.VITE_API_URL}/api/books/search?q=${query}&startIndex=${startIndex}`,
      );

      console.log(books.length);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/books/search?q=${query}&startIndex=${startIndex}`,
      );

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message);
      }
      console.log(data);

      console.log("before setBooks");
      setBooks((prev) => {
        const existingIds = new Set(prev.map((book) => book.id));
        const newBooks = data.items.filter(
          (book) =>
            !existingIds.has(book.id) &&
            book.volumeInfo.imageLinks?.thumbnail &&
            book.volumeInfo.description,
        );
        return [...prev, ...newBooks];
      });
      console.log("after setBooks");

      setStartIndex((prev) => prev + 10);
      setIsLoading(false);
    } catch (err) {
      console.log("catch error:", err);
      setLoadMoreError("Could not fetch more books, please try again.");
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && (
        <p className="loading" aria-live="polite">
          Loading...
        </p>
      )}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && books.length === 0 && !error && (
        <p className="info-message">No books found</p>
      )}
      <div className="books-grid">
        {books && books.map((book) => <BookCard key={book.id} book={book} />)}
      </div>
      {loadMoreError && <p className="error-message">{loadMoreError}</p>}
      <button
        className="loadmore-btn"
        onClick={() => {
          loadMoreBooks();
        }}
      >
        Load more
      </button>
    </>
  );
}
