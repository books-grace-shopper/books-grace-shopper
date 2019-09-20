import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

export default class PaymentInfoForm extends React.Component {
  constructor() {
    super()
    this.state = {
      cardNumber: '',
      nameOnCard: '',
      expirationMonth: '',
      expirationYear: '',
      securityCode: ''
    }
    // this.handleChange = this.handleChange.bind(this)
  }

  // handleChange(event) {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   })
  // }

  render() {
    return (
      <>
        <h2>Payment Method</h2>
        <Form>
          <Form.Group controlId="formGridNameOnCard">
            <Form.Label>Name on Card</Form.Label>
            <Form.Control
              type="text"
              name="nameOnCard"
              placeholder="First Last"
            />
          </Form.Group>
          <Form.Row>
            <Form.Group controlId="formGridCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" name="cardNumber" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridExpirationMonth">
              <Form.Label>Expiration Month</Form.Label>
              <Form.Control name="expirationMonth" as="select">
                <option>Choose...</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} controlId="formGridExpirationYear">
              <Form.Label>Expiration Year</Form.Label>
              <Form.Control name="expirationYear" type="text" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridSecurityCode">
              <Form.Label>Security Code</Form.Label>
              <Form.Control name="securityCode" type="text" />
            </Form.Group>
          </Form.Row>
        </Form>
      </>
    )
  }
}

// JSX CODE:
{
  /* <>
<form id="shipping-address-form">
  <h2>Payment Method</h2>
  <label htmlFor="cardNumber">Card Number:</label>
  <input
    type="text"
    name="cardNumber"
    placeholder="Card Number"
    value={this.props.cardNumber} // will need to update this value
    onChange={this.handleChange} //will need a handleChange function
  />
  <label htmlFor="nameOnCard">Name on Card:</label>
  <input
    type="text"
    name="nameOnCard"
    placeholder="First and Last Name"
    // value={this.props.nameOnCard} //will need to update this value
    // onChange={this.handleChange} // will need a handleChange function
  />
  <label htmlFor="expirationMonth">Expiration Month:</label>
  <input
    type="text"
    name="expirationMonth"
    placeholder="May"
    // value={this.props.expirationMonth} //will need to update this value
    // onChange={this.handleChange} //will need a handleChange function
  />
  <label htmlFor="expirationYear">Expiration Year:</label>
  <input
    type="text"
    name="expirationYear"
    placeholder="2020"
    // value={this.props.expirationYear} //will need to update this value
    // onChange={this.handleChange} //will need a handleChange function
  />
</form>
</> */
}
