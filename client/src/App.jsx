
import { Routes, Route } from 'react-router-dom'
import Header from "./components/header.jsx"
import BookDetails from "./views/BookDetails.jsx"
import MainPage from "./views/MainPage.jsx"
import SavedBooks from "./views/SavedBooks.jsx"
import SearchResults from "./views/SearchResults.jsx"
import './App.css'

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
    </>
  )
}

export default App
