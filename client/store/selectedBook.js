import axios from 'axios'

const SELECT_BOOK = 'SELECT_BOOK'
const DELETE_REVIEW = 'DELETE_REVIEW'

const selectBook = selectedBook => ({
  type: SELECT_BOOK,
  selectedBook: selectedBook
})

const deleteReviewAction = reviewId => ({
  type: DELETE_REVIEW,
  reviewId: reviewId
})

export const fetchSelectedBook = bookId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/books/${bookId}`)
    dispatch(selectBook(data))
  } catch (err) {
    console.error(err)
    dispatch(err)
  }
}

export const deleteReviewThunk = reviewId => async dispatch => {
  try {
    await axios.delete(`/api/reviews/${reviewId}`)
    dispatch(deleteReviewAction(reviewId))
  } catch (err) {
    console.error(err)
    dispatch(err)
  }
}

const initialState = {}

export default function selectedBookReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_BOOK:
      return action.selectedBook
    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== action.reviewId)
      }
    default:
      return state
  }
}
