import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function CartOrder(props) {
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
          <h1>Write me!</h1>
        )}
      </div>
    )
  }
}

export default connect(mapState)(Cart)
