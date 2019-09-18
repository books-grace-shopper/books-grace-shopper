import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function CartOrder(props) {
  return (
    <>
      <div className="selected-book-container">
        <Card>
          <div className="selected-book-img-container">
            <img className="selected-book-img" src={book.imageUrl} />
          </div>
          <div className="selected-book-info">
            <p>{book.title}</p>
            <p>By: {book.author}</p>
            <p>RATING</p>
            <p>${book.price}</p>
            <button type="button">Add to Cart</button>
          </div>
        </Card>
      </div>
    </>
  )
}

export default class Cart extends React.Component {
  render() {
    return (
      <>
        <div className="cart-container">Hello</div>
      </>
    )
  }
}
