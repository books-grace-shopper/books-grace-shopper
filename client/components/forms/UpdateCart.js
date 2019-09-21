import React from 'react'
import {connect} from 'react-redux'
import {updateBookQuantityThunk} from '../../store/order'

class UpdateCart extends React.Component {
  constructor(props) {
    super(props)
    const bookInCart = this.props.cart.books.find(
      book => book.id === this.props.selectedBook.id
    )
    this.state = {
      selectedBookQuantity: bookInCart ? bookInCart.quantity : 0
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
      <form onSubmit={this.handleSubmit}>
        <button type="submit">
          {this.state.selectedBookQuantity ? 'Modify Cart' : 'Add to Cart'}
        </button>
        <select
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