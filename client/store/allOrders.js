import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const getOrders = orders => ({
  type: GET_ORDERS,
  orders: orders
})

export const fetchOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders/admin/')
    dispatch(getOrders(data))
  } catch (err) {
    console.error(err)
    dispatch(err)
  }
}

const initialState = []

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return state
  }
}
