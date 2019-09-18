import React from 'react'
import {connect} from 'react-redux'
import {fetchSelectedBook} from '../../store/selectedBook'
import Card from 'react-bootstrap/Card'
import BookReviews from './BookReviews'

function SelectedBookCard(props) {
  const book = props.selectedBook
  return (
    <>
      <div className="selected-book-container">
        <Card>
          <div className="selected-book-img-container">
            <img className="selected-book-img" src={book.imageUrl} />
          </div>
          <div className="selected-book-info">
            <p>{book.title}</p>
            <p>By: {book.author}</p>
            <p>RATING</p>
            <p>${book.price}</p>
            <button type="button">Add to Cart</button>
          </div>
        </Card>
      </div>
    </>
  )
}

class SelectedBook extends React.Component {
  componentDidMount() {
    this.props.fetchSelectedBook(this.props.match.params.bookId)
  }

  render() {
    return (
      <>
        <h1>Check out this book!</h1>
        {this.props.selectedBook ? (
          <>
            <SelectedBookCard selectedBook={this.props.selectedBook} />
            <BookReviews />
          </>
        ) : (
          <p>Loading</p>
        )}
      </>
    )
  }
}

const mapState = state => {
  return {
    selectedBook: state.selectedBook
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSelectedBook: bookId => dispatch(fetchSelectedBook(bookId))
  }
}

export default connect(mapState, mapDispatch)(SelectedBook)
