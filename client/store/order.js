import axios from 'axios'

const GET_GUESTS_CART = 'GET_GUESTS_CART'
const GET_USERS_CART = 'GET_USERS_CART'
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

const UPDATE_BOOK_QUANTITY = 'UPDATE_BOOK_QUANTITY'

const REMOVE_BOOK_FROM_CART = 'REMOVE_BOOK_FROM_CART'

const USER_ERROR_MESSAGE = `ERROR: We couldn't find or create a cart for you.`

const UPDATE_BOOKS_AND_ORDER = 'UPDATE_BOOKS_AND_ORDER'

export const getGuestsCart = cart => ({
  type: GET_GUESTS_CART,
  cart: cart
})

export const updateBooksAndOrder = cart => ({
  type: UPDATE_BOOKS_AND_ORDER,
  cart: cart
})

const getUsersCart = cart => ({
  type: GET_USERS_CART,
  cart: cart
})

const getOrderHistory = orderHistory => {
  return {
    type: GET_ORDER_HISTORY,
    orderHistory: orderHistory
  }
}

const updateBookQuantity = books => ({
  type: UPDATE_BOOK_QUANTITY,
  books: books
})

const removeBookFromCart = books => ({
  type: REMOVE_BOOK_FROM_CART,
  books: books
})

export const fetchUsersCart = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/users/${userId}`)
    dispatch(getUsersCart(data.cart))
  } catch (err) {
    console.log(USER_ERROR_MESSAGE)
    console.error(err)
  }
}

export const updateBooksAndOrderThunk = id => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${id}/finalized`)
    dispatch(updateBooksAndOrder(data))
  } catch (err) {
    console.error('We could not process that order for you.')
    console.error(err)
  }
}

export const updateBookQuantityThunk = (
  bookId,
  cartId,
  bookQuantity
) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${cartId}`, {
      bookId: bookId,
      bookQuantity: bookQuantity
    })
    dispatch(updateBookQuantity(data.books))
  } catch (err) {
    console.log(`We couldn't change the quantity.`)
    console.error(err)
  }
}

export const removeBookThunk = (bookId, cartId) => async dispatch => {
  try {
    const {data} = await axios.delete(`api/orders/${cartId}/books/${bookId}`)
    dispatch(removeBookFromCart(data.books))
  } catch (err) {
    console.log(USER_ERROR_MESSAGE)
    console.error(err)
  }
}

const initialCart = {}

export default function orderReducer(state = initialCart, action) {
  switch (action.type) {
    case GET_GUESTS_CART:
      return action.cart
    case GET_USERS_CART:
      return action.cart
    case UPDATE_BOOK_QUANTITY:
      return {...state, books: action.books}
    case REMOVE_BOOK_FROM_CART:
      return {...state, books: action.books}
    case UPDATE_BOOKS_AND_ORDER:
      return action.cart
    default:
      return state
  }
}
