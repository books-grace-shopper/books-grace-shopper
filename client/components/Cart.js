import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'

function CartBook(props) {
  const book = props.book
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

function mapState(state) {
  return {
    cart: state.cart
  }
}

class Cart extends React.Component {
  render() {
    const cart = this.props.cart
    if (!cart.books) {
      return <div>Loading cart...</div>
    }
    return (
      <div>
        {cart.books.length === 0 ? (
          <h1>Go add things to the cart!</h1>
        ) : (
          cart.books.map(book => {
            return <CartBook key={book.bookId} book={book} />
          })
        )}
      </div>
    )
  }
}

export default connect(mapState)(Cart)
