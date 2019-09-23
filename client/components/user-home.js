import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, name, isAdmin} = props
  return (
    <div>
      <h3>Welcome, {name ? name : email}</h3>
      {isAdmin && <Link to="/admin/orders">View All Orders</Link>}
      <Link to="/user/orders">view your order history</Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name,
    isAdmin: !!state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
