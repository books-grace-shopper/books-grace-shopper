import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {default as books} from './allBooks'
import {default as selectedBook} from './selectedBook'
import {default as cart} from './order.js'
import {default as allBookInfo} from './allBookInfo.js'

const reducer = combineReducers({
  user,
  books,
  cart,
  selectedBook,
  allBookInfo
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './order'
