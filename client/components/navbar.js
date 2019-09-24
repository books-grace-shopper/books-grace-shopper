import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="header-container">
    <Link to="/">
      <h1 className="bookazon-title">BOOKAZON</h1>
    </Link>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="home-button">
            Home
          </Link>
          <a href="#" onClick={handleClick} className="logout-button">
            Logout
          </a>
          <Link to="/user/order-history" className="signup-button">
            Order History
          </Link>
        </div>
      ) : (
        <div className="header-buttons">
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="login-button">
            Login
          </Link>
          <Link to="/signup" className="signup-button">
            Sign Up
          </Link>
        </div>
      )}
      <Link to="/cart">
        <button type="button">
          <img
            className="cart-button-img"
            src="https://image.flaticon.com/icons/png/512/34/34627.png"
          />
        </button>
      </Link>
      <Link to="/checkout">
        <button type="button">Checkout</button>
      </Link>

      {isAdmin ? (
        <Link to="/admin/home">
          <button type="button">Admin</button>
        </Link>
      ) : (
        ''
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
