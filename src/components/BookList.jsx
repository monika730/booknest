import BookCard from './BookCard'

function BookList({ books, readingList, onToggleReadingList, emptyMessage = 'No books match your search just yet.' }) {
  if (books.length === 0) {
    return <div className="empty-state"><span aria-hidden="true">⌕</span><p>{emptyMessage}</p></div>
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          isSaved={readingList.some((savedBook) => savedBook.id === book.id)}
          onToggleReadingList={onToggleReadingList}
        />
      ))}
    </div>
  )
}

export default BookList