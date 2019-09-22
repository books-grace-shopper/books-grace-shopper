import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/allOrders'
import Card from 'react-bootstrap/Card'
import SingleOrderInfo from '../SingleOrderInfo'

class AllOrders extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount() {
    this.props.fetchOrders()
  }
  render() {
    const orders = this.props.orders

    return (
      <>
        <div className="all-orders-header">
          <h1>All Orders</h1>
          {orders ? (
            <div className="all-orders-container">
              {orders.map(order => {
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
    fetchOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapState, mapDispatch)(AllOrders)
