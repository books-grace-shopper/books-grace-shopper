import axios from 'axios'

const SELECT_BOOK = 'SELECT_BOOK'

const selectBook = selectedBook => ({
  type: SELECT_BOOK,
  selectedBook: selectedBook
})

export const fetchSelectedBook = bookId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/books/${bookId}`)
    dispatch(selectBook(data))
  } catch (err) {
    console.err(err)
    dispatch(err)
  }
}

const initialState = {}

export default function selectedBookReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_BOOK:
      return action.selectedBook
    default:
      return state
  }
}
