import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function BookDetails({ readingList, onToggleReadingList }) {
  const { id } = useParams()
  const [detailState, setDetailState] = useState({ id: '', book: null, error: '' })

  useEffect(() => {
    let isActive = true

    async function loadBook() {
      try {
        const response = await fetch(`/api/books/${encodeURIComponent(id)}`)
        if (response.status === 404) {
          if (isActive) {
            setDetailState({ id, book: null, error: '' })
          }
          return
        }
        if (!response.ok) {
          throw new Error('The book service is not available.')
        }
        const loadedBook = await response.json()
        if (isActive) {
          setDetailState({ id, book: loadedBook, error: '' })
        }
      } catch (error) {
        if (isActive) {
          setDetailState({ id, book: null, error: error.message })
        }
      }
    }

    loadBook()

    return () => {
      isActive = false
    }
  }, [id])

  if (detailState.id !== id) {
    return <p className="loading-state page-width">Loading book details...</p>
  }

  if (detailState.error) {
    return <p className="loading-state page-width" role="alert">{detailState.error} Start the app with <code>npm run dev</code>.</p>
  }

  const book = detailState.book

  if (!book) {
    return (
      <section className="not-found page-width">
        <p className="eyebrow">BOOK NOT FOUND</p>
        <h1>This page is a blank page.</h1>
        <Link className="button button-dark" to="/books">Back to the bookshelf</Link>
      </section>
    )
  }

  const isSaved = readingList.some((savedBook) => savedBook.id === book.id)

  return (
    <section className="detail-page page-width">
      <Link className="back-link" to="/books"><span aria-hidden="true">←</span> Back to all books</Link>
      <div className="detail-layout">
        <div className="detail-cover-wrap"><img className="detail-cover" src={book.image} alt={`Cover of ${book.title}`} /></div>
        <div className="detail-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> {book.genre.toUpperCase()}</p>
          <h1>{book.title}</h1>
          <p className="detail-author">by {book.author}</p>
          <div className="detail-stats"><span><strong>★ {book.rating}</strong> reader rating</span><span><strong>{book.year}</strong> first published</span></div>
          <div className="detail-rule" />
          <h2>About this book</h2>
          <p className="detail-description">{book.description}</p>
          <button
            className={`button ${isSaved ? 'button-outline' : 'button-dark'}`}
            type="button"
            onClick={() => onToggleReadingList(book)}
            aria-pressed={isSaved}
          >
            {isSaved ? '✓ In your reading list' : '+ Add to reading list'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default BookDetails