import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Button from 'react-bootstrap/Button'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div className="header-container">
    <div className="header-container-left">
      <Link to="/">
        <h1 className="bookazon-title">BOOKAZON</h1>
      </Link>
    </div>
    <nav className="header-container-right">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="home-button">
            <Button>Home</Button>
          </Link>
          <a href="#" onClick={handleClick} className="logout-button">
            <Button>Logout</Button>
          </a>
          <Link to="/user/order-history" className="signup-button">
            <Button>Order History</Button>
          </Link>
        </div>
      ) : (
        <div className="header-buttons">
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="login-button">
            <Button>Login</Button>
          </Link>
          <Link to="/signup" className="signup-button">
            <Button>Sign Up</Button>
          </Link>
        </div>
      )}
      {isAdmin ? (
        <Link to="/admin/home">
          <Button type="button">Admin</Button>
        </Link>
      ) : (
        ''
      )}
      <Link to="/cart">
        <Button variant="light" type="button">
          <img
            className="cart-button-img"
            src="https://image.flaticon.com/icons/png/512/34/34627.png"
          />
        </Button>
      </Link>
    </nav>
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
