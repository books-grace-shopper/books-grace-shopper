import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'

function CartForCheckout(props) {
  return (
    <div className="cart-book-container">
      {props.cart.books &&
        props.cart.books.map(book => (
          <Card key={book.id}>
            <div className="cart-book-img-container">
              <img className="cart-book-img" />
            </div>
            <div className="cart-book-info">
              <img className="book-img-cart-checkout" src={book.imageUrl} />
              <h2>{book.title}</h2>
              <p>By: {book.author}</p>
              <p>Quantity: {book.quantity}</p>
              <p>Price: ${book.price / 100}</p>
              <p>Subtotal: ${book.price * book.quantity / 100}</p>
            </div>
          </Card>
        ))}
    </div>
  )
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapState)(CartForCheckout)
