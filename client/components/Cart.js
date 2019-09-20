import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartBook from './CartBook'

function mapState(state) {
  return {
    cart: state.cart
  }
}

class Cart extends React.Component {
  render() {
    const cart = this.props.cart
    console.log('CART IN CART COMPONENT IS', this.props.cart)
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
      </div>
    )
  }
}

export default connect(mapState)(Cart)
