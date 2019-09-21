import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

export default class ShippingAddressForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      city: '', //may need to add this field to the model/db
      state: '' //may need to add this field to the model/db
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
        <h2>Shipping Address</h2>
        <Form>
          <Form.Group controlId="formGridName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="First Last" />
          </Form.Group>
          <Form.Row>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="1234 Main St"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" placeholder="Chicago" />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control name="state" as="select">
                <option>Choose...</option>
                <option>CA</option>
                <option>IL</option>
                <option>NY</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
      </>
    )
  }
}

// JSX FORM CODE:
{
  /* <form id="shipping-address-form">
          <h2>Shipping Address</h2>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="First and Last Name"
            // value={this.props.name} // will need to update this value
            // onChange={this.handleChange} //will need a handleChange function
          />
          <label htmlFor="address">Street Address:</label>
          <input
            type="text"
            name="address"
            placeholder="123 Sunny Place"
            // value={this.props.address} //will need to update this value
            // onChange={this.handleChange} // will need a handleChange function
          />
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            placeholder="Chicago"
            // value={this.props.city} //will need to update this value
            // onChange={this.handleChange} //will need a handleChange function
          />
          <label htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            placeholder="IL"
            // value={this.props.state} //will need to update this value
            // onChange={this.handleChange} //will need a handleChange function
          />
        </form>*/
}
