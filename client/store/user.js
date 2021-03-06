import axios from 'axios'
import history from '../history'
import {getGuestsCart} from './order.js'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
// const FILTER_ORDER_HISTORY = 'FILTER_ORDER_HISTORY';

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
// const filterOrderHistory = (visFilter) => ({ type: FILTER_ORDER_HISTORY, visFilter: visFilter });

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    if (res.data.status === 'cart') {
      dispatch(getGuestsCart(res.data))
      dispatch(getUser(defaultUser))
    } else {
      dispatch(getUser(res.data))
    }
  } catch (err) {
    console.error(err)
  }
}

export const auth = (user, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, user)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// export const filterOrderHistoryThunk = (visFilter) => (dispatch) => {
// 	try {
// 		dispatch(filterOrderHistory(visFilter));
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

/**
 * REDUCER
 */

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    // case FILTER_ORDER_HISTORY;
    // return { ...state, orderHistory: action. }
    default:
      return state
  }
}
