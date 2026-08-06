
import { Routes, Route } from 'react-router-dom'
import Header from "./components/header.jsx"
import Footer from "./components/Footer.jsx"
import BookDetails from "./views/BookDetails.jsx"
import MainPage from "./views/MainPage.jsx"
import SavedBooks from "./views/SavedBooks.jsx"
import SearchResults from "./views/SearchResults.jsx"

function App() {

  

  return (
    <>
    <Header />
      <Routes>
      <Route path="/" element={<MainPage />}/>
      <Route path="/searchresults" element={<SearchResults />}/>
      <Route path="/bookdetails/:id" element={<BookDetails />}/>
      <Route path="/savedbooks" element={<SavedBooks />}/>
      </Routes>
    <Footer />
    </>
  )
}

export default App
