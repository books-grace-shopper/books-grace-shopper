import React from 'react'
import {connect} from 'react-redux'
// import { me } from '../store';

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

  // componentDidMount() {
  // 	fetchUsersOrders(this.props.user.id);
  // }

  render() {
    const {isLoggedIn, user} = this.props
    const orders = user.orders
    return (
      <div>
        {isLoggedIn ? (
          <div>
            Hello,
            {/* <div>
							{orders.map((order) => {
								return <p key={order.id}>{order.status}</p>;
							})}
						</div> */}
          </div>
        ) : (
          <div>log in to view your order history</div>
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

// const mapDispatch = (dispatch) => {
// 	return {
// 		// fetchUsersOrders: (userId) => dispatch(fetchUsersOrders(userId))
// 	};
// };

export default connect(mapState)(OrderHistory)
