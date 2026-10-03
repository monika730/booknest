import { useNavigate } from 'react-router-dom'

function SearchBar({ searchText, onSearchChange, label = 'Find your next read' }) {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/books')
  }

  return (
    <form className="search-form" role="search" aria-label={label} onSubmit={handleSubmit}>
      <label className="search-field">
        <span className="search-icon" aria-hidden="true">⌕</span>
        <span className="visually-hidden">{label}</span>
        <input
          type="search"
          value={searchText}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or author"
        />
      </label>
      <button className="search-submit" type="submit">Search</button>
    </form>
  )
}

export default SearchBar