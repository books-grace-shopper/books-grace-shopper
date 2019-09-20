import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ShippingAddressForm, PaymentInfoForm} from './forms'

import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {toast} from 'react-toastify'
// import "react-toastify/dist/ReactToastify.css";

toast.configure()

export default function Checkout() {
  const [product] = React.useState({
    name: 'Tesla Roadster',
    price: 64998.67,
    description: 'Cool car'
  })
  console.log('product', product)
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
    <div className="container">
      <div className="product">
        <h1>{product.name}</h1>
        <h3>On Sale · ${product.price}</h3>
      </div>
      <StripeCheckout
        stripeKey="pk_test_I8ksxTCz5FRqZTny6zk5KTmi00y9ARKB0B"
        token={handleToken}
        shippingAddress
        billingAddress
        amount={product.price}
        name={product.name}
      />
    </div>
  )
}
