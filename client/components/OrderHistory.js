import React from 'react'
import {connect} from 'react-redux'

const VIEW_ALL = 'VIEW_ALL'
const VIEW_CANCELLED = 'VIEW_CANCELLED'
const VIEW_SHIPPED = 'VIEW_SHIPPED'
const VIEW_ORDERED = 'VIEW_ORDERED'
const VIEW_DELIVERED = 'VIEW_DELIVERED'

class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visFilter: VIEW_ALL
    }
  }

  render() {
    const {isLoggedIn, user} = this.props
    const orders = user.orderHistory
    return (
      <div>
        {isLoggedIn && user.orderHistory ? (
          <div>
            Hello,
            <div>
              {orders.map(order => {
                return (
                  <div key={order.id}>
                    <p>Order status: {order.status}</p>
                    <p>subtotal: ${order.subtotal}</p>
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

const mapState = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(OrderHistory)
