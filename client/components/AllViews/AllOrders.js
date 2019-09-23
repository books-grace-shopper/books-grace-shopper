import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders, fetchOrdersByStatus} from '../../store/allOrders'
import Card from 'react-bootstrap/Card'
import SingleOrderInfo from '../SingleOrderInfo'

class AllOrders extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.filter = ''
  }
  componentDidMount() {
    this.props.fetchOrders()
  }

  handleChange(event) {
    this.filter = event.target.value
  }
  handleSubmit(event) {
    event.preventDefault()

    if (this.filter) {
      this.props.fetchOrdersByStatus(this.filter)
    } else {
      this.props.fetchOrders()
    }
  }
  render() {
    const orders = this.props.orders

    return (
      <>
        <div className="all-orders-header">
          <form onSubmit={this.handleSubmit}>
            <h1>All Orders</h1>
            <label htmlFor="status">Status:</label>
            <select onChange={this.handleChange}>
              <option value="">All</option>
              <option value="cart">Cart</option>
              <option value="ordered">Ordered</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button type="submit">Filter By Status</button>
          </form>
          {orders ? (
            <div className="all-orders-container">
              {this.filter
                ? orders.map(order => {
                    if (order.status === this.filter) {
                      return <SingleOrderInfo order={order} />
                    }
                  })
                : orders.map(order => {
                    return <SingleOrderInfo order={order} />
                  })}
            </div>
          ) : (
            <p>Loading</p>
          )}
        </div>
      </>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders
  }
}

const mapDispatch = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders()),
    fetchOrdersByStatus: status => dispatch(fetchOrdersByStatus(status))
  }
}

export default connect(mapState, mapDispatch)(AllOrders)
