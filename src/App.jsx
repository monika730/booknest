import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import booksData from './data/books'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import BookDetails from './pages/BookDetails'
import Books from './pages/Books'
import Home from './pages/Home'
import ReadingList from './pages/ReadingList'

function App() {
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All genres')
  const [readingList, setReadingList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('booknest-reading-list')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('booknest-reading-list', JSON.stringify(readingList))
  }, [readingList])

  function toggleReadingList(book) {
    const isAlreadySaved = readingList.some((savedBook) => savedBook.id === book.id)

    setReadingList((currentList) => {
      return isAlreadySaved
        ? currentList.filter((savedBook) => savedBook.id !== book.id)
        : [...currentList, book]
    })

    const request = isAlreadySaved
      ? fetch(`/api/reading-list/${book.id}`, { method: 'DELETE' })
      : fetch('/api/reading-list', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ bookId: book.id }),
        })

    request.catch((error) => console.error('Reading-list API sync failed:', error))
  }

  return (
    <BrowserRouter>
      <div className="site-shell">
        <Navbar readingListCount={readingList.length} />
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  books={booksData}
                  searchText={searchText}
                  onSearchChange={setSearchText}
                  readingList={readingList}
                  onToggleReadingList={toggleReadingList}
                />
              }
            />
            <Route
              path="/books"
              element={
                <Books
                  searchText={searchText}
                  onSearchChange={setSearchText}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  readingList={readingList}
                  onToggleReadingList={toggleReadingList}
                />
              }
            />
            <Route
              path="/book/:id"
              element={
                <BookDetails
                  readingList={readingList}
                  onToggleReadingList={toggleReadingList}
                />
              }
            />
            <Route
              path="/reading-list"
              element={
                <ReadingList
                  readingList={readingList}
                  onToggleReadingList={toggleReadingList}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
