import React from 'react'
import {connect} from 'react-redux'

const VIEW_ALL = 'VIEW_ALL'
const VIEW_CANCELLED = 'cancelled'
const VIEW_SHIPPED = 'shipped'
const VIEW_ORDERED = 'ordered'
const VIEW_DELIVERED = 'delivered'

function parseDate(date) {
  const idx = date.indexOf('T')
  return date.slice(0, idx)
}

class OrderHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visFilter: VIEW_ALL
    }
    this.filterView = this.filterView.bind(this)
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
          <div>
            Hello,
            <div>
              <select onChange={this.filterView}>
                <option value={VIEW_ALL}>all</option>
                <option value={VIEW_ORDERED}>ordered</option>
                <option value={VIEW_SHIPPED}>shipped</option>
                <option value={VIEW_DELIVERED}>delivered</option>
                <option value={VIEW_CANCELLED}>cancelled</option>
              </select>
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
                    <div key={order.id}>
                      <p>Order placed: {parseDate(order.createdAt)}</p>
                      <p>status: {order.status}</p>
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
  console.log('mapState runs')
  return {
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    // filterOrderHistory: (event) => dispatch(this.setState({ visFilter: event.target.value }))
  }
}

export default connect(mapState, mapDispatch)(OrderHistory)
