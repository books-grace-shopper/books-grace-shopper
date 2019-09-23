import axios from 'axios'

const GET_METADATA = 'GET_METADATA'

const getMetadata = metaData => ({
  type: GET_METADATA,
  info: metaData
})

export const fetchMetadata = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/books/metadata`)
    dispatch(getMetadata(data))
  } catch (err) {
    console.error('We could not fetch the genres and authors')
    console.error(err)
  }
}

const initialMetadata = {genres: [], authors: []}

export default function bookInfoReducer(state = initialMetadata, action) {
  switch (action.type) {
    case GET_METADATA:
      return action.info
    default:
      return state
  }
}
