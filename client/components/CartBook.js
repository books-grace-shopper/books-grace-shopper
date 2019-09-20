import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {
  requestBookOnCart,
  decrementBookThunk,
  removeBookThunk
} from '../store/order'

const CartBook = props => {
  const {book, cartId, incrementBook, decrementBook, removeBook} = props
  return (
    <div className="cart-book-container">
      <Card>
        <div className="cart-book-img-container">
          <img className="cart-book-img" />
        </div>
        <div className="cart-book-info">
          <h2>title: {book.title}</h2>
          <p>By: {book.author}</p>
          <p>description: {book.description}</p>
          <p>${book.price}</p>
          <p>quantity: {book.quantity}</p>
          <button
            type="button"
            onClick={() => {
              incrementBook(book.id, cartId)
            }}
          >
            increment
          </button>
          <button
            type="button"
            onClick={() => {
              decrementBook(book.id, cartId)
            }}
          >
            decrement
          </button>
          <button
            type="button"
            onClick={() => {
              removeBook(book.id, cartId)
            }}
          >
            Remove from Cart
          </button>
        </div>
      </Card>
    </div>
  )
}
const mapDispatch = dispatch => ({
  incrementBook: (bookId, cartId) =>
    dispatch(requestBookOnCart(bookId, cartId)),
  decrementBook: (bookId, cartId) =>
    dispatch(decrementBookThunk(bookId, cartId)),
  removeBook: (bookId, cartId) => dispatch(removeBookThunk(bookId, cartId))
})

export default connect(null, mapDispatch)(CartBook)
