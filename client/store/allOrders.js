import axios from 'axios'

const GET_ORDERS = 'GET_ORDERS'

const GET_ORDERS_BY_STATUS = 'GET_ORDERS_BY_STATUS'

const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS'

const getOrders = orders => ({
  type: GET_ORDERS,
  orders: orders
})

const updateOrderStatus = updatedOrder => ({
  type: UPDATE_ORDER_STATUS,
  updatedOrder: updatedOrder
})

const getOrdersByStatus = statusOrders => ({
  type: GET_ORDERS_BY_STATUS,
  statusOrders: statusOrders
})

export const fetchOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/admin/orders/')
    dispatch(getOrders(data))
  } catch (err) {
    console.error(err)
    dispatch(err)
  }
}

export const fetchOrdersByStatus = orderStatus => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/admin/orders/status?status=${orderStatus}`
    )
    dispatch(getOrdersByStatus(data))
  } catch (err) {
    console.error(err)
    dispatch(err)
  }
}

export const updateOrderThunk = updatedOrder => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/admin/orders/${updatedOrder.id}`,
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
    case GET_ORDERS_BY_STATUS:
      // return state.filter(order => order.status === action.status)
      return action.statusOrders
    case UPDATE_ORDER_STATUS:
      const ordersWithoutUpdatedOrder = state.filter(
        order => order.id !== action.updatedOrder.id
      )
      return [...ordersWithoutUpdatedOrder, action.updatedOrder]
    default:
      return state
  }
}
