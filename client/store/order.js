import axios from 'axios'

const GET_USERS_CART = 'GET_USERS_CART'
const ADD_BOOK_TO_CART = 'ADD_BOOK_TO_CART'

const USER_ERROR_MESSAGE = `ERROR: We couldn't find or create a cart for you.`

const DECREMENT_BOOK = 'DECREMENT_BOOK'

const getUsersCart = cart => ({
  type: GET_USERS_CART,
  cart: cart
})

const addBookToCart = books => ({
  type: ADD_BOOK_TO_CART,
  books: books
})

const decrementBook = books => ({
  type: DECREMENT_BOOK,
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

export const requestBookOnCart = (bookId, cartId) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders/${cartId}`, {bookId: bookId})
    dispatch(addBookToCart(data.books))
  } catch (err) {
    console.log(`We couldn't put the book on the cart.`)
    console.error(err)
  }
}

export const decrementBookThunk = (bookId, cartId) => async dispatch => {
  try {
    const {data} = await axios.put(`/api/orders/${cartId}`, {bookId: bookId})
    dispatch(decrementBook(data))
  } catch (err) {
    console.log(USER_ERROR_MESSAGE)
    console.error(err)
  }
}

const initialCart = {}

export default function orderReducer(state = initialCart, action) {
  switch (action.type) {
    case GET_USERS_CART:
      return action.cart
    case ADD_BOOK_TO_CART:
      return {...state, books: action.books}
    case DECREMENT_BOOK:
      return {...state, books: action.books}
    default:
      return state
  }
}
