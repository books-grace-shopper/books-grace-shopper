import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const NameAndAddress = () => {
  return (
    <div>
      <div>
        <label htmlFor="userName">
          <small>Name (Optional)</small>
        </label>
        <input name="userName" type="text" />
      </div>
      <div>
        <label htmlFor="address">
          <small>Address (Optional)</small>
        </label>
        <input name="address" type="text" />
      </div>
    </div>
  )
}

const EmailAndPassword = () => {
  return (
    <div>
      <div>
        <label htmlFor="email">
          <small>Email</small>
        </label>
        <input name="email" type="text" />
      </div>
      <div>
        <label htmlFor="password">
          <small>Password</small>
        </label>
        <input name="password" type="password" />
      </div>
    </div>
  )
}

/**
 * COMPONENT
 */

const AuthForm = props => {
  const {name, displayName, handleSubmit, error, location} = props
  // console.log('props... ', props);
  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <EmailAndPassword />
        {location.pathname === '/signup' && <NameAndAddress />}
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const user = {
        email: evt.target.email.value,
        password: evt.target.password.value
      }
      if (evt.target.userName) user.name = evt.target.userName.value
      if (evt.target.address) user.address = evt.target.address.value

      const formName = evt.target.name
      dispatch(auth(user, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
