import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {removeBookThunk, updateBookQuantityThunk} from '../store/order'

class CartBook extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentQuantity: this.props.book.quantity,
      currentPrice: this.props.book.quantity * this.props.book.price / 100
    }
    this.handleEvent = this.handleEvent.bind(this)
  }
  async handleEvent(event) {
    const newQuantity = Number(event.target.value)
    const newPrice = newQuantity * this.props.book.price
    await this.props.updateBook(
      this.props.book.id,
      this.props.cartId,
      newQuantity
    )
    this.setState({
      currentQuantity: newQuantity,
      currentPrice: newPrice / 100
    })
  }
  render() {
    const {book, cartId, removeBook, updateBook} = this.props
    return (
      <div className="cart-book-container">
        <Card>
          <div className="cart-book-img-container">
            <img className="cart-book-img" />
          </div>
          <div className="cart-book-info">
            <h2>{book.title}</h2>
            <p>By: {book.author}</p>
            <p>Description: {book.description}</p>
            <p>${this.state.currentPrice}</p>
            <p>Quantity: {book.quantity}</p>
            <select
              value={this.state.currentQuantity}
              onChange={this.handleEvent}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <button
              type="button"
              onClick={() => {
                removeBook(book.id, cartId)
              }}
            >
              Remove from Cart
            </button>
          </div>
        </Card>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  updateBook: (bookId, cartId, bookQuantity) =>
    dispatch(updateBookQuantityThunk(bookId, cartId, bookQuantity)),
  removeBook: (bookId, cartId) => dispatch(removeBookThunk(bookId, cartId))
})

export default connect(null, mapDispatch)(CartBook)
