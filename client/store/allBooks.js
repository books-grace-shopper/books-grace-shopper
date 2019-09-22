import axios from 'axios'
import queryString from 'query-string'

const GET_BOOKS = 'GET_BOOKS'

const getBooks = books => ({
  type: GET_BOOKS,
  books: books
})

export const fetchBooks = (pageNumber, pageFilter) => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/books?${queryString.stringify({pageNumber, pageFilter})}`
    )
    dispatch(getBooks(data))
  } catch (err) {
    console.error(err)
    dispatch(err)
  }
}

const initialState = []

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return action.books
    default:
      return state
  }
}
