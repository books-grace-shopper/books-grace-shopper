import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders, fetchOrdersByStatus} from '../../store/allOrders'
import SingleOrderInfo from '../SingleOrderInfo'

const initialState = {
  filter: '',
  isFiltered: false
}

class AllOrders extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = initialState
  }
  componentDidMount() {
    this.props.fetchOrders()
  }

  handleChange(event) {
    this.setState(
      {
        filter: event.target.value
      },
      () => {
        if (this.state.filter) {
          this.props.fetchOrdersByStatus(this.state.filter)
          this.setState({isFiltered: true})
        } else {
          this.props.fetchOrders()
          this.setState({isFiltered: false})
        }
      }
    )
  }

  render() {
    const orders = this.props.orders

    return (
      <>
        <div className="all-orders-header">
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

          {orders ? (
            <div className="all-orders-container">
              {this.state.isFiltered
                ? orders.map(order => {
                    if (order.status === this.state.filter) {
                      return <SingleOrderInfo key={order.id} order={order} />
                    }
                  })
                : orders.map(order => {
                    return <SingleOrderInfo key={order.id} order={order} />
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
