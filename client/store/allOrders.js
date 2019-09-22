import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

const getOrders = orders => ({
  type: GET_ORDERS,
  orders: orders
})

const updateOrderStatus = updatedOrder => ({
  type: UPDATE_ORDER_STATUS,
  updatedOrder: updatedOrder
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
export const updateOrderThunk = updatedOrder => async dispatch => {
  try {
    console.log('updatedOrder: ', updatedOrder)
    const {data} = await axios.put(
      `/api/orders/admin/${updatedOrder.id}`,
      updatedOrder
    )
    dispatch(updateOrderStatus(data))
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
    case UPDATE_ORDER_STATUS:
      const ordersWithoutUpdatedOrder = state.filter(
        order => order.id !== action.updatedOrder.id
      )
      return [...ordersWithoutUpdatedOrder, action.updatedOrder]
    default:
      return state
  }
}
