import axios from 'axios'

const GET_TOTAL_BOOKS = 'GET_TOTAL_BOOKS'

const getTotalBooks = count => ({
  type: GET_TOTAL_BOOKS,
  count: count
})

export const fetchBookTotal = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/books/count')
    dispatch(getTotalBooks(data))
  } catch (err) {
    console.log('ERROR IN FETCH BOOK', err)
    console.error(err)
  }
}

const initialInfo = {
  totalBooks: 0
}

export default function(state = initialInfo, action) {
  switch (action.type) {
    case GET_TOTAL_BOOKS:
      return {...initialInfo, totalBooks: 0}
    default:
      return state
  }
}
