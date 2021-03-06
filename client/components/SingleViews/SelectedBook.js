import React from 'react'
import {connect} from 'react-redux'
import {fetchSelectedBook, deleteReviewThunk} from '../../store/selectedBook'
import {PostReview, UpdateCart} from '../forms'
import Card from 'react-bootstrap/Card'
import BookReviews from './BookReviews'
import Rating from 'react-rating'
import {getRating} from '../../../utils'

function SelectedBookInfo(props) {
  return (
    <div className="whole-selected-book">
      <SelectedBookCard
        cart={props.cart}
        userId={props.userId}
        selectedBook={props.selectedBook}
      />
      <BookReviews
        deleteReview={props.deleteReview}
        reviews={props.selectedBook.reviews}
      />
    </div>
  )
}

export function SelectedBookCard(props) {
  const book = props.selectedBook
  let rating =
    book.reviews &&
    book.reviews.reduce((accum, review) => {
      accum += review.rating
      return accum
    }, 0)
  if (!rating) {
    rating = <em>No reviews yet...</em>
  } else {
    rating = <em>{rating.toFixed(2)} out of 5</em>
  }
  return (
    <div>
      <div className="selected-book-container">
        <Card>
          <div className="selected-book-card">
            <div className="selected-book-img-container">
              <img className="selected-book-img" src={book.imageUrl} />
            </div>
            <div className="selected-book-info">
              <p className="book-title">{book.title}</p>
              <p className="book-author">By: {book.author}</p>
              <Rating
                readonly={true}
                placeholderRating={book.reviews && getRating(book.reviews)}
              />
              <p>{rating}</p>
              <p>${(book.price / 100).toFixed(2)}</p>
            </div>
            {props.cart.books ? (
              <UpdateCart selectedBook={book} cart={props.cart} />
            ) : (
              <p>Loading cart...</p>
            )}
          </div>
        </Card>
        {props.userId && <PostReview />}
      </div>
    </div>
  )
}

class SelectedBook extends React.Component {
  componentDidMount() {
    this.props.fetchSelectedBook(this.props.match.params.bookId)
  }
  render() {
    return (
      <div>
        <h4 className="selected-book-quote">
          “A reader lives a thousand lives before he dies... The man who never
          reads lives only one." – George R.R. Martin
        </h4>
        {this.props.selectedBook ? (
          <SelectedBookInfo
            cart={this.props.cart}
            userId={this.props.userId}
            selectedBook={this.props.selectedBook}
            deleteReview={this.props.deleteReview}
            reviews={this.props.selectedBook.reviews}
          />
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
    cart: state.cart,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSelectedBook: bookId => dispatch(fetchSelectedBook(bookId)),
    deleteReview: (reviewId, book) =>
      dispatch(deleteReviewThunk(reviewId, book))
  }
}

export default connect(mapState, mapDispatch)(SelectedBook)
