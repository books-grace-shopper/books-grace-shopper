import React from 'react'
import {connect} from 'react-redux'
import {fetchSelectedBook, deleteReviewThunk} from '../../store/selectedBook'
import {requestBookOnCart} from '../../store/order'
import Card from 'react-bootstrap/Card'
import BookReviews from './BookReviews'

function SelectedBookCard(props) {
  const book = props.selectedBook
  return (
    <div>
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
          </div>
        </Card>
      </div>
    </div>
  )
}

class SelectedBook extends React.Component {
  componentDidMount() {
    this.props.fetchSelectedBook(this.props.match.params.bookId)
  }
  render() {
    const selectedBook = this.props.selectedBook
    return (
      <div>
        <h4 className="selected-book-quote">
          “A reader lives a thousand lives before he dies... The man who never
          reads lives only one." – George R.R. Martin
        </h4>
        {this.props.cart.books ? (
          <button
            onClick={() => {
              this.props.requestSelectedBook(
                this.props.selectedBook.id,
                this.props.cart.id
              )
            }}
            type="button"
          >
            Add to Cart
          </button>
        ) : (
          <h1>Loading cart...</h1>
        )}
        {this.props.selectedBook ? (
          <div>
            <SelectedBookCard selectedBook={selectedBook} />
            <BookReviews
              // book={this.props.selectedBook}
              deleteReview={this.props.deleteReview}
              reviews={selectedBook.reviews}
            />
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    selectedBook: state.selectedBook,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSelectedBook: bookId => dispatch(fetchSelectedBook(bookId)),
    requestSelectedBook: (bookId, cartId) =>
      dispatch(requestBookOnCart(bookId, cartId)),
    deleteReview: (reviewId, book) =>
      dispatch(deleteReviewThunk(reviewId, book))
  }
}

export default connect(mapState, mapDispatch)(SelectedBook)
