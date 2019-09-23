import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  AllBooks,
  SelectedBook,
  Cart,
  Checkout,
  AllOrders,
  OrderHistory
} from './components'
import {me, fetchUsersCart} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }
  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.props.fetchUsersCart(this.props.userId)
    }
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={AllBooks} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/books/:bookId" component={SelectedBook} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/user/order-history" component={OrderHistory} />
        {isAdmin && (
          <Switch>
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/admin/orders" component={AllOrders} />
            <Route exact path="/admin/books" />
            <Route exact path="/admin/users" />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/checkout" component={Checkout} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    userId: state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchUsersCart(userId) {
      dispatch(fetchUsersCart(userId))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
