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
    const {data} = await axios.get(
      `/api/books?${queryString.stringify(urlParams)}`
    )
    dispatch(getBooks(data))
  } catch (err) {
    console.error(err)
  }
}

export const addBookThunk = (newBook, history) => async dispatch => {
  try {
    newBook.price = Number(newBook.price)
    newBook.inventoryTotal = Number(newBook.inventoryTotal)
    newBook.inventorySold = Number(newBook.inventorySold)
    for (let field in newBook) {
      if (
        newBook[field] === '' ||
        newBook[field] === undefined ||
        newBook[field] === null
      ) {
        delete newBook[field]
      }
    }

    const response = await axios.post('/api/admin/books', newBook)
    const createdBook = response.data

    dispatch(addBook(createdBook))
    history.push(`/books/${createdBook.id}`)
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
