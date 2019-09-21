import React from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../../store/allOrders'

// const AllOrders = props => {
//   return <div>HELLO, I AM ALL ORDERS!</div>
// }
// export default AllOrders

class AllOrders extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount() {
    console.log('this.props: ', this.props)
    this.props.fetchOrders()
  }
  render() {
    return (
      <>
        <div>I AM ALL ALL ORDERS</div>
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
