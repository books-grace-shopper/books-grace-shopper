import React from 'react'
import {connect} from 'react-redux'
import {updateBookQuantityThunk} from '../../store/order'
import Button from 'react-bootstrap/Button'

class UpdateCart extends React.Component {
  constructor(props) {
    super(props)
    const bookInCart = this.props.cart.books.find(
      book => book.id === this.props.selectedBook.id
    )
    this.state = {
      selectedBookQuantity: bookInCart ? bookInCart.quantity : 1,
      bookInCart: bookInCart
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.updateBookInCart(
      this.props.selectedBook.id,
      this.props.cart.id,
      this.state.selectedBookQuantity
    )
    this.setState({bookInCart: true})
  }
  handleChange(event) {
    this.setState({
      selectedBookQuantity: event.target.value
    })
  }
  render() {
    if (!this.props.cart) {
      return <p>Loading cart...</p>
    }
    return (
      <form className="selected-book-card" onSubmit={this.handleSubmit}>
        <Button type="submit">
          {this.state.bookInCart ? 'Modify Cart' : 'Add to Cart'}
        </Button>
        <select
          className="filter"
          defaultValue={this.state.selectedBookQuantity}
          onChange={this.handleChange}
        >
          {Array.from({length: 10})
            .map((_, index) => index + 1)
            .map(value => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              )
            })}
        </select>
      </form>
    )
  }
}

function mapDispatch(dispatch) {
  return {
    updateBookInCart(bookId, cartId, quantity) {
      dispatch(updateBookQuantityThunk(bookId, cartId, quantity))
    }
  }
}

export default connect(null, mapDispatch)(UpdateCart)
