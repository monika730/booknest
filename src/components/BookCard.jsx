import { Link } from 'react-router-dom'

function BookCard({ book, isSaved, onToggleReadingList }) {
  return (
    <article className="book-card">
      <Link className="book-cover-link" to={`/book/${book.id}`} aria-label={`View details for ${book.title}`}>
        <img className="book-cover" src={book.image} alt={`Cover of ${book.title}`} loading="lazy" />
        <span className="book-genre">{book.genre}</span>
      </Link>
      <div className="book-card-content">
        <div className="book-card-heading">
          <div>
            <h3><Link to={`/book/${book.id}`}>{book.title}</Link></h3>
            <p className="book-author">by {book.author}</p>
          </div>
          <span className="book-rating" aria-label={`${book.rating} out of 5 stars`}>
            <span aria-hidden="true">★</span> {book.rating}
          </span>
        </div>
        <div className="book-card-actions">
          <Link className="text-link" to={`/book/${book.id}`}>View details <span aria-hidden="true">↗</span></Link>
          <button
            className={`save-button${isSaved ? ' is-saved' : ''}`}
            type="button"
            onClick={() => onToggleReadingList(book)}
            aria-pressed={isSaved}
          >
            <span aria-hidden="true">{isSaved ? '✓' : '+'}</span>
            {isSaved ? 'Saved' : 'Add to list'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default BookCard