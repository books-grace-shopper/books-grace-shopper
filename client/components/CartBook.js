import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {requestBookOnCart, decrementBookThunk} from '../store/order'

const CartBook = props => {
  const {book, cartId} = props
  return (
    <>
      <div className="cart-book-container">
        <Card>
          <div className="cart-book-img-container">
            <img className="cart-book-img" />
          </div>
          <div className="cart-book-info">
            <p>Book Title Here</p>
            <p>By: Author Name here</p>
            <p>Book Id: {book.bookId}</p>

            <p>${book.price}</p>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              // value={book.quantity}
              min="1"
              max="100"
            />
            <button type="button">Remove from Cart</button>
          </div>
        </Card>
      </div>
    </>
  )
}
const mapDispatch = dispatch => ({
  incrementBook: (bookId, cartId) =>
    dispatch(requestBookOnCart(bookId, cartId)),
  decrementBook: (bookId, cartId) =>
    dispatch(decrementBookThunk(bookId, cartId))
})
