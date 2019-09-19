import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ShippingAddressForm, PaymentInfoForm} from './Forms'

export default class Checkout extends React.Component {
  render() {
    return (
      <>
        <ShippingAddressForm />
        <PaymentInfoForm />
        <button type="submit">Complete Purchase</button>
      </>
    )
  }
}
