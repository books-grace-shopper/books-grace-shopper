import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders, fetchOrdersByStatus} from '../../store/allOrders'
import Card from 'react-bootstrap/Card'
import SingleOrderInfo from '../SingleOrderInfo'
import orderReducer from '../../store/order'

const initialState = {
  filter: ''
}

class AllOrders extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = initialState
  }
  componentDidMount() {
    this.props.fetchOrders()
  }

  handleChange(event) {
    this.setState({
      filter: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const filter = this.state.filter
    filter ? this.props.fetchOrdersByStatus(filter) : this.props.fetchOrders()
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
              {!this.state.filter
                ? orders.map(order => {
                    return <SingleOrderInfo order={order} />
                  })
                : orders.map(order => {
                    if (order.status === this.state.filter)
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
