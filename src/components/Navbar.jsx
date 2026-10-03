import { NavLink } from 'react-router-dom'

function Navbar({ readingListCount }) {
  return (
    <header className="site-header">
      <nav className="navbar page-width" aria-label="Main navigation">
        <NavLink className="brand" to="/" aria-label="BookNest home">
          <span className="brand-mark" aria-hidden="true">B</span>
          <span>booknest<span className="brand-period">.</span></span>
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/books">Explore books</NavLink>
          <NavLink className="reading-nav" to="/reading-list">
            Reading list <span className="nav-count">{readingListCount}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar