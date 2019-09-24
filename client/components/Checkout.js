import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {connect} from 'react-redux'
import CartForCheckout from './CartForCheckout'
import {updateBooksAndOrderThunk} from '../store/order.js'

toast.configure()

function Checkout(props) {
  let totalPrice =
    props.cart.books &&
    props.cart.books.reduce((sum, book) => {
      sum += book.quantity * book.price
      return sum
    }, 0) / 100

  const product = {
    description: 'Bookazon Order',
    price: totalPrice
  }

  async function handleToken(token) {
    try {
      console.log('props inside handleToken', props)
      const response = await axios.post(
        'http://localhost:8080/stripe/checkout',
        {
          token,
          product
        }
      )
      const {error, status} = response.data
      console.log(error, status)
      if (status === 'success') {
        toast('Success! Check email for details!', {type: 'success'})
        props.history.push('/success')
        props.updateBooksAndOrder(props.cart.id)
      } else {
        toast('Oops! Something went wrong!', {
          type: 'error'
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <div className="div-checkout">
        <h2 className="checkout-header">Checkout</h2>
        <CartForCheckout />
        <div className="checkout">
          <h2>
            Order Total: $
            {props.cart.books &&
              (
                props.cart.books.reduce((sum, book) => {
                  sum += book.quantity * book.price
                  return sum
                }, 0) / 100
              ).toFixed(2)}
          </h2>

          <StripeCheckout
            name="Bookazon"
            stripeKey="pk_test_I8ksxTCz5FRqZTny6zk5KTmi00y9ARKB0B"
            token={handleToken}
            shippingAddress
            billingAddress
            amount={
              props.cart.books &&
              props.cart.books.reduce((sum, book) => {
                sum += book.quantity * book.price
                return sum
              }, 0)
            }
          />
        </div>
      </div>
    </>
  )
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    updateBooksAndOrder(id) {
      dispatch(updateBooksAndOrderThunk(id))
    }
  }
}

export default connect(mapState, mapDispatch)(Checkout)
