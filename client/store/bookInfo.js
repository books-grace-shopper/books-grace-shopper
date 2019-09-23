import axios from 'axios'

const GET_GENRES_AND_AUTHORS = 'GET_GENRES_AND_AUTHORS'

const fetchGenresAndAuthors = () => async dispatch => {
  try {
    await axios.get(`/api/books/metadata`)
  } catch (err) {
    console.error('We couldn not fetch the genres and authors')
    console.error(err)
  }
}

const initialInfo = {genres: [], authors: []}

export default function bookInfoReducer(state = initialInfo, action) {
  switch (action.type) {
    case GET_GENRES_AND_AUTHORS:
      return action.info
    default:
      return state
  }
}
