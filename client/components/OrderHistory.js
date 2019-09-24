import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Card, {Body, Title, Text} from 'react-bootstrap/Card'
import {parseDate} from '../../utils'
import {me} from '../store'

const VIEW_ALL = 'VIEW_ALL'
const VIEW_CANCELLED = 'cancelled'
const VIEW_SHIPPED = 'shipped'
const VIEW_ORDERED = 'ordered'
const VIEW_DELIVERED = 'delivered'

class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visFilter: VIEW_ALL
    }
    this.filterView = this.filterView.bind(this)
  }
  componentDidMount() {
    this.props.loadOrderHistory()
  }
  shouldComponentUpdate() {
    return true
  }
  filterView(event) {
    this.setState({visFilter: event.target.value})
  }

  render() {
    const {isLoggedIn, user} = this.props
    const orders = user.orderHistory
    return (
      <div>
        {isLoggedIn && user.orderHistory ? (
          <div className="order-history-background">
            <h2 className="order-history-greeting">Order History</h2>
            <select
              onChange={this.filterView}
              className="filter-order-history filter"
            >
              <option value={VIEW_ALL}>all</option>
              <option value={VIEW_ORDERED}>ordered</option>
              <option value={VIEW_SHIPPED}>shipped</option>
              <option value={VIEW_DELIVERED}>delivered</option>
              <option value={VIEW_CANCELLED}>cancelled</option>
            </select>
            <div className="order-history-contains-all">
              {orders
                .filter(order => {
                  if (this.state.visFilter === VIEW_ALL) {
                    return order
                  } else if (order.status === this.state.visFilter) {
                    return order
                  }
                })
                .map(order => {
                  return (
                    <div key={order.id} className="past-order-container">
                      <PastOrder order={order} />
                    </div>
                  )
                })}
            </div>
          </div>
        ) : (
          <div>no order history</div>
        )}
      </div>
    )
  }
}

const PastOrder = props => {
  const order = props.order
  return (
    <Card style={{width: '100rem'}}>
      <Body>
        <div className="past-order-details">
          <Title>Order status: {order.status}</Title>
          <Text>placed: {parseDate(order.createdAt)}</Text>
          <Text>subtotal: ${(order.subtotal / 100).toFixed(2)}</Text>
        </div>
        <div className="past-order-books-list">
          <Title>items on this order:</Title>
          {order.books.map(book => {
            return (
              <div key={book.id} className="past-order-book">
                <Link to={`/books/${book.id}`}>
                  <ul id="hail-mary">
                    <li className="past-order-item">
                      <div className="item-list-title">
                        {book.title} by {book.author}
                      </div>
                      <div className="item-list-price">
                        price: ${(book.price / 100).toFixed(2)}
                      </div>
                    </li>
                  </ul>
                </Link>
              </div>
            )
          })}
        </div>
      </Body>
    </Card>
  )
}

const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadOrderHistory() {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
