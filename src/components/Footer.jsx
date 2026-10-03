import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner page-width">
        <Link className="footer-brand" to="/">booknest<span>.</span></Link>
        <p>A little room for your next favorite book.</p>
        <span className="footer-note">Made for curious readers</span>
      </div>
    </footer>
  )
}

export default Footer