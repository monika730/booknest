import { Component } from 'react'

class ReadingListSummary extends Component {
  render() {
    const { bookCount } = this.props
    const bookLabel = bookCount === 1 ? 'book' : 'books'

    return (
      <div className="reading-list-summary">
        <span>{bookCount} {bookLabel} saved</span>
        <span>Saved on this device</span>
      </div>
    )
  }
}

export default ReadingListSummary