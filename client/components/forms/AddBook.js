import React from 'react'
import {connect} from 'react-redux'
import {addBookThunk} from '../../store/allBooks'
import Button from 'react-bootstrap/Button'

import Form, {Group, Label, Row, Control} from 'react-bootstrap/Form'

const initialState = {
  title: '',
  description: '',
  price: '',
  inventoryTotal: '',
  inventorySold: 0,
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
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addBook(this.state)
    this.setState(initialState)
  }

  render() {
    return (
      <>
        <div>
          <h2>ADD NEW BOOK</h2>
          <Form onSubmit={this.handleSubmit}>
            <Group>
              <Label htmlFor="title">Title</Label>
              <Control
                placeholder="Enter title"
                onChange={this.handleChange}
                value={this.state.title}
                name="title"
                required
              />
            </Group>
            <br />
            <Group>
              <Label htmlFor="description">Description</Label>
              <Control
                placeholder="Enter description"
                as="textarea"
                onChange={this.handleChange}
                name="description"
                required
              />
            </Group>

            <br />
            <Group>
              <Label htmlFor="price">Price</Label>
              <Control
                placeholder="Enter price"
                onChange={this.handleNumberInput}
                name="price"
                required
              />
            </Group>
            <br />
            <Group>
              <Label htmlFor="inventoryTotal">Inventory Total</Label>
              <Control
                placeholder="Enter inventory total"
                onChange={this.handleNumberInput}
                name="inventoryTotal"
                required
              />
            </Group>
            <br />
            <Group>
              <Label htmlFor="inventorySold">Inventory Total</Label>
              <Control
                onChange={this.handleNumberInput}
                value={this.state.inventorySold}
                name="inventorySold"
              />
            </Group>

            <br />
            <Group>
              <Label htmlFor="imageUrl">Image Url</Label>
              <Control
                placeholder="Enter image url"
                onChange={this.handleChange}
                name="imageUrl"
              />
            </Group>
            <br />
            <Group>
              <Label htmlFor="genre">Genre</Label>
              <Control
                placeholder="Enter genre"
                onChange={this.handleChange}
                name="genre"
                required
              />
            </Group>
            <br />
            <Group>
              <Label htmlFor="author">Author</Label>
              <Control
                placeholder="Enter author name"
                onChange={this.handleChange}
                name="author"
                required
              />
            </Group>
            <br />
            <Button type="submit" variant="primary">
              Add Book
            </Button>
          </Form>
        </div>
      </>
    )
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    addBook: newBook => dispatch(addBookThunk(newBook, ownProps.history))
  }
}

export default connect(null, mapDispatch)(AddBook)
