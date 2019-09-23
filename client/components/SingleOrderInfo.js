import React from 'react'
import {connect} from 'react-redux'
import Card from 'react-bootstrap/Card'
import {updateOrderThunk, fetchOrders} from '../store/allOrders'

class SingleOrderInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: this.props.order.status
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    const order = this.props.order
    order.status = this.state.status
    this.props.updateOrderStatus(order)

    // this.setState({status: updatedOrder.status})
    // this.props.fetchOrders()
  }

  handleChange(event) {
    this.setState({
      status: event.target.value
    })
    console.log('state: ', this.state)
  }

  render() {
    const order = this.props.order
    const name = order.user ? order.user.name : 'guest'
    return (
      <>
        <div key={order.id} className="single-order-card">
          <form onSubmit={this.handleSubmit}>
            <Card style={{width: '16rem'}}>
              <Card.Body>
                <Card.Title>Order: {order.id}</Card.Title>
                <Card.Text>
                  Date Ordered:{' '}
                  {order.createdAt && order.createdAt.slice(0, 10)}
                </Card.Text>
                <Card.Text>Customer Name: {name}</Card.Text>
                <Card.Text />
                <Card.Text>Total price: ${order.price}</Card.Text>
                <Card.Text>
                  Status:
                  {
                    <select
                      defaultValue={this.state.status}
                      onChange={this.handleChange}
                    >
                      <option value="cart">Cart</option>
                      <option value="ordered">Ordered</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  }
                </Card.Text>
                <button type="submit">Update Order Status</button>
              </Card.Body>
            </Card>
          </form>
        </div>
      </>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    updateOrderStatus: updatedOrder => dispatch(updateOrderThunk(updatedOrder)),
    fetchOrders: () => dispatch(fetchOrders())
  }
}

export default connect(null, mapDispatch)(SingleOrderInfo)
