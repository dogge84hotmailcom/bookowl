import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import bookshelf from "../assets/images/peter-herrman-bookshelf.jpg";
//import readingchair from "../assets/images/vlad-patana-readingchair.jpg";

export default function MainPage() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();

    navigate(`/searchresults?q=${searchInput}`);
  }

  return (
    <>
      <div className="hero" style={{ backgroundImage: `url(${bookshelf})` }}>
        <div className="hero-overlay">
          <form onSubmit={(e) => handleSearch(e)}>
            <div className="search-container">
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                type="text"
                placeholder="Search for a title..."
              ></input>
              <Search aria-label="Search icon" />
            </div>
            <button type="submit">Search</button>
          </form>
          <button
            className="savedbooks-btn-mainpage"
            type="button"
            onClick={() => navigate(`/savedbooks`)}
          >
            Saved Books
          </button>
        </div>
      </div>
    </>
  );
}
