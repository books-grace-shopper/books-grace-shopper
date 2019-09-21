import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartBook from './CartBook'
import Checkout from './Checkout'

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
            return <CartBook key={book.title} book={book} cartId={cart.id} />
          })
        )}
        <div>
          <h1>
            Price: ${cart.books.reduce((sum, book) => {
              sum += book.quantity * book.price
              return sum
            }, 0) / 100}
          </h1>
          <Link to="/checkout" component={Checkout}>
            <button type="button">Checkout</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default connect(mapState)(Cart)
