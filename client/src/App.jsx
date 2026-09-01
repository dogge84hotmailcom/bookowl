import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BookDetails from "./views/BookDetails.jsx";
import MainPage from "./views/MainPage.jsx";
import SavedBooks from "./views/SavedBooks.jsx";
import SearchResults from "./views/SearchResults.jsx";

function App() {
  return (
    <>
      <Header />
      <main role="main">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/searchresults" element={<SearchResults />} />
          <Route path="/bookdetails/:id" element={<BookDetails />} />
          <Route path="/savedbooks" element={<SavedBooks />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
