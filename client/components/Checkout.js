import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {connect} from 'react-redux'
import Cart from './Cart'

toast.configure()

function Checkout(props) {
  console.log('props.cart', props.cart) //I added this
  let cart = props.cart
  let books = props.cart.books
  console.log('props.cart.books', books) //I added this

  const [product] = React.useState({
    //unsure how to update this
    title: '',
    author: '',
    price: 1
  })

  async function handleToken(token, addresses) {
    try {
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
      <h2>Your Order</h2> {/*I added all of this here */}
      <Cart />
      {/* // <div className="container">
    //   <div className="product">
    //     <h1>{product.name}</h1>
    //     <h3>${product.price}</h3>
    //   </div> */}
      <StripeCheckout
        name="Bookazon"
        stripeKey="pk_test_I8ksxTCz5FRqZTny6zk5KTmi00y9ARKB0B"
        token={handleToken}
        shippingAddress
        billingAddress
        // amount={}
        // name={product.name}
      />
      {/* </div> */}
    </>
  )
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

export default connect(mapState)(Checkout)
