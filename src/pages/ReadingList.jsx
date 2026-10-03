import { Link } from 'react-router-dom'
import BookList from '../components/BookList'
import ReadingListSummary from '../components/ReadingListSummary'

function ReadingList({ readingList, onToggleReadingList }) {
  return (
    <section className="reading-page page-width">
      <div className="page-intro reading-intro">
        <p className="eyebrow"><span className="eyebrow-line" /> YOUR PERSONAL SHELF</p>
        <h1>Books to <em>come back to.</em></h1>
        <p>Your saved reads stay right here, ready for whenever you are.</p>
      </div>
      <ReadingListSummary bookCount={readingList.length} />
      {readingList.length === 0 ? (
        <div className="reading-empty">
          <span className="empty-shelf-icon" aria-hidden="true">▤</span>
          <h2>Your shelf is waiting.</h2>
          <p>Save a book you’d like to read and it will find a home here.</p>
          <Link className="button button-dark" to="/books">Find a book <span aria-hidden="true">↗</span></Link>
        </div>
      ) : (
        <BookList
          books={readingList}
          readingList={readingList}
          onToggleReadingList={onToggleReadingList}
          emptyMessage="Your reading list is empty."
        />
      )}
    </section>
  )
}

export default ReadingList