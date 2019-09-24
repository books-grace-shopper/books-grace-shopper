import React from 'react'
import {connect} from 'react-redux'
import {addBookThunk} from '../../store/allBooks'

import Form, {Group, Label, Row, Control} from 'react-bootstrap/Form'

const initialState = {
  title: '',
  description: '',
  price: '',
  inventoryTotal: '',
  inventorySold: '',
  genre: '',
  author: ''
}

class AddBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = initialState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleNumberInput = this.handleNumberInput.bind(this)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleNumberInput(event) {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    for (let i = 0; i < event.target.value.length; i++) {
      if (!numbers.includes(event.target.value[i])) {
        return
      }
    }
    this.setState({
      [event.target.name]: event.target.value
    })

    // }
  }
  handleSubmit(event) {
    event.preventDefault()
    console.log('state: ', this.state)
    this.props.addBook(this.state)
    this.setState(initialState)
  }
  render() {
    return (
      <>
        <div>
          <h2>ADD NEW BOOK</h2>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="title">Title: </label>
            <input
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="description">Description: </label>
            <input
              name="description"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="price">Price: </label>
            <input
              name="price"
              value={this.state.price}
              onChange={this.handleNumberInput}
            />
            <br />
            <label htmlFor="inventoryTotal">Inventory Total: </label>
            <input
              name="inventoryTotal"
              value={this.state.inventoryTotal}
              onChange={this.handleNumberInput}
            />
            <br />
            <label htmlFor="inventorySold">Inventory Sold: </label>
            <input
              name="inventorySold"
              value={this.state.inventorySold}
              onChange={this.handleChange}
            />
            <br />
            {/* <label htmlFor="imageUrl">Image URL: </label>
            <input
              name="imageUrl"
              value={this.state.imageUrl}
              onChange={this.handleChange}
            /> */}
            <br />
            <label htmlFor="genre">Genre: </label>
            <input
              name="genre"
              value={this.state.genre}
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="author">Author: </label>
            <input
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
            <br />
            <button type="submit">Add Book</button>
          </form>
        </div>
      </>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addBook: newBook => dispatch(addBookThunk(newBook))
  }
}

export default connect(null, mapDispatch)(AddBook)
