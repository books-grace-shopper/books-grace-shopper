import axios from 'axios'
import queryString from 'query-string'

const GET_BOOKS = 'GET_BOOKS'

const getBooks = books => ({
  type: GET_BOOKS,
  books: books
})

export const fetchBooks = urlParams => async dispatch => {
  try {
    urlParams.pageNumber = urlParams.pageNumber || 1
    console.log('QUERY STRING', queryString.stringify(urlParams))
    const {data} = await axios.get(
      `/api/books?${queryString.stringify(urlParams)}`
    )
    dispatch(getBooks(data))
  } catch (err) {
    console.error(err)
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
