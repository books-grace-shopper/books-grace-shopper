import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/allOrders'
import Card from 'react-bootstrap/Card'

const SingleOrder = props => {
  const order = props.order
  const name = order.user ? order.user.name : 'Customer Name'

  return (
    <>
      <div key={order.id} className="single-order-card">
        <Card style={{width: '16rem'}}>
          <Card.Body>
            <Card.Title>Order: {order.id}</Card.Title>
            <Card.Text>Date Ordered: {order.createdAt.slice(0, 10)}</Card.Text>
            <Card.Text>Customer Name: {name}</Card.Text>
            <Card.Text />
            <Card.Text>Total price: ${order.price}</Card.Text>
            <Card.Text>
              Status:{' '}
              {
                <select>
                  <option />
                </select>
              }
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

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
                return <SingleOrder order={order} />
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
