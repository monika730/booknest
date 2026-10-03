import { useEffect, useState } from 'react'
import BookList from '../components/BookList'
import CategoryFilter from '../components/CategoryFilter'
import SearchBar from '../components/SearchBar'

function Books({ searchText, onSearchChange, selectedCategory, onCategoryChange, readingList, onToggleReadingList }) {
  const [books, setBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadBooks() {
      try {
        const response = await fetch('/api/books')
        if (!response.ok) {
          throw new Error('The book service is not available.')
        }
        const loadedBooks = await response.json()
        if (isActive) {
          setBooks(loadedBooks)
        }
      } catch (error) {
        if (isActive) {
          setLoadError(error.message)
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    loadBooks()

    return () => {
      isActive = false
    }
  }, [])

  const categories = ['All genres', ...new Set(books.map((book) => book.genre))]
  const filteredBooks = books.filter((book) => {
    const searchValue = searchText.trim().toLowerCase()
    const matchesSearch = `${book.title} ${book.author}`.toLowerCase().includes(searchValue)
    const matchesCategory = selectedCategory === 'All genres' || book.genre === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <section className="catalog-page page-width">
      <div className="page-intro">
        <p className="eyebrow"><span className="eyebrow-line" /> THE BOOKSHELF</p>
        <h1>Browse your<br /><em>next favorite.</em></h1>
        <p>A small, considered collection for wherever your curiosity takes you.</p>
      </div>
      <div className="catalog-toolbar">
        <SearchBar searchText={searchText} onSearchChange={onSearchChange} label="Search books by title or author" />
        <CategoryFilter categories={categories} selectedCategory={selectedCategory} onCategoryChange={onCategoryChange} />
        <span className="results-count">{filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'}</span>
      </div>
      {isLoading ? (
        <p className="loading-state">Gathering books for your shelf...</p>
      ) : loadError ? (
        <p className="loading-state" role="alert">{loadError} Start the app with <code>npm run dev</code>.</p>
      ) : (
        <BookList books={filteredBooks} readingList={readingList} onToggleReadingList={onToggleReadingList} />
      )}
    </section>
  )
}

export default Books