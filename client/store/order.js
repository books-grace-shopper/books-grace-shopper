import axios from 'axios'

const GET_USERS_CART = 'GET_USERS_CART'

const USER_ERROR_MESSAGE = `ERROR: We couldn't find or create a cart for you.`

const getUsersCart = cart => ({
  type: GET_USERS_CART,
  cart: cart
})

const initialCart = {}

export const fetchUsersCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    dispatch(getUsersCart(data.cart))
  } catch (err) {
    console.log(USER_ERROR_MESSAGE)
    console.error(err)
  }
}

export default function orderReducer(state = initialCart, action) {
  switch (action.type) {
    case GET_USERS_CART:
      return action.cart
    default:
      return state
  }
}
