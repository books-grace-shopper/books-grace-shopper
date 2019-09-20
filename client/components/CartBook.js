import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {removeBookThunk, updateBookQuantityThunk} from '../store/order'

const CartBook = props => {
  const {book, cartId, removeBook, updateBook} = props
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
          <select
            onChange={() => {
              updateBook(book.id, cartId)
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
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
  updateBook: (bookId, cartId, bookQuantity) =>
    dispatch(updateBookQuantityThunk(bookId, cartId, bookQuantity)),
  removeBook: (bookId, cartId) => dispatch(removeBookThunk(bookId, cartId))
})

export default connect(null, mapDispatch)(CartBook)
