import axios from 'axios'
import queryString from 'query-string'

const GET_BOOKS = 'GET_BOOKS'

const ADD_BOOK = 'ADD_BOOK'

const getBooks = books => ({
  type: GET_BOOKS,
  books: books
})

const addBook = newBook => ({
  type: ADD_BOOK,
  newBook: newBook
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

export const addBookThunk = newBook => async dispatch => {
  try {
    for (let field in newBook) {
      if (
        newBook[field] === '' ||
        newBook[field] === undefined ||
        newBook[field] === null
      ) {
        delete newBook[field]
      }
    }
    newBook.price = Number(newBook.price)
    newBook.inventoryTotal = Number(newBook.inventoryTotal)
    newBook.inventorySold = Number(newBook.inventorySold)

    console.log('newBook in thunk: ', newBook)
    const {data} = await axios.post('/api/admin/books', newBook)
    dispatch(addBook(data))
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
    case ADD_BOOK:
      return [...state, action.newBook]
    default:
      return state
  }
}
