import { Link } from 'react-router-dom'
import BookList from '../components/BookList'
import SearchBar from '../components/SearchBar'

function Home({ books, searchText, onSearchChange, readingList, onToggleReadingList }) {
  const featuredBooks = books.slice(0, 4)

  return (
    <>
      <section className="hero-section">
        <div className="hero-inner page-width">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> YOUR NEXT CHAPTER STARTS HERE</p>
            <h1>Find a book<br />that <em>feels like you.</em></h1>
            <p className="hero-description">Thoughtful recommendations for the curious, the daydreamers, and everyone in between.</p>
            <div className="hero-search-row">
              <SearchBar searchText={searchText} onSearchChange={onSearchChange} />
              <Link className="button button-dark" to="/books">Explore books <span aria-hidden="true">↗</span></Link>
            </div>
            <div className="reader-note"><span className="reader-avatars" aria-hidden="true"><i>J</i><i>M</i><i>A</i></span><span><strong>Good books, shared.</strong> Find one worth passing on.</span></div>
          </div>
          <div className="hero-art" aria-label="A stack of books ready to be discovered">
            <div className="hero-art-label"><span>THE READER'S<br />SHELF</span><span className="hero-art-star">✳</span></div>
            <img src={books[1].image} alt="Cover of The Hobbit" />
            <div className="hero-art-caption"><span>01 / A WORLD<br />WORTH WANDERING</span><span>✦</span></div>
            <span className="hero-art-index">B. 2025</span>
          </div>
        </div>
        <div className="hero-bottom page-width"><span>Independent reading starts here</span><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span></div>
      </section>

      <section className="featured-section page-width">
        <div className="section-heading">
          <div><p className="eyebrow">A FEW GOOD PLACES TO START</p><h2>Picked for your shelf<span>.</span></h2></div>
          <Link className="text-link section-link" to="/books">See all books <span aria-hidden="true">↗</span></Link>
        </div>
        <BookList books={featuredBooks} readingList={readingList} onToggleReadingList={onToggleReadingList} />
      </section>

      <section className="quote-band">
        <div className="quote-band-inner page-width"><span className="quote-mark" aria-hidden="true">“</span><p>Somewhere, something incredible is waiting to be known.</p><span className="quote-credit">CARL SAGAN</span></div>
      </section>
    </>
  )
}

export default Home