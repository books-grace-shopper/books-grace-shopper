import axios from 'axios'

const GET_BOOKS = 'GET_BOOKS'

const getBooks = books => ({
  type: GET_BOOKS,
  books: books
})

export const fetchBooks = pageNumber => async dispatch => {
  try {
    const queryString = `/api/books?pageNumber=${pageNumber}`
    const {data} = await axios.get(queryString)
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
