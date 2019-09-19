import axios from 'axios'

const GET_CART = 'GET_CART'

const getCart = cart => ({
  type: GET_CART,
  cart: cart
})

const initialCart = {}

export const fetchCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/user/${userId}`)
    console.log(data)
    // dispatch(getCart())
    // We need a way to get the user...
    // await axios.get('/api/')
  } catch (err) {
    console.error(err)
  }
}

export default function orderReducer(state = initialCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}
