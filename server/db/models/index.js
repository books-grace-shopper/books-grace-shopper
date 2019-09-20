const User = require('./user')
const Book = require('./book')
const Review = require('./review')
const Order = require('./order')
const OrderBook = require('./orderBook.js')
const Session = require('./session')

const {MODEL_METHODS} = require('../../../utils')

Book.belongsToMany(Order, {through: OrderBook})
Book.hasMany(Review)

Order.belongsToMany(Book, {through: OrderBook})
Order.belongsTo(User)

User.hasMany(Review)
User.hasMany(Order)

Review.belongsTo(User)
Review.belongsTo(Book)

Session.hasOne(Order)

const MODELS = [User, Book, Review, Order, OrderBook, Session]

MODELS.forEach(Model => {
  MODEL_METHODS.forEach(method => {
    Model[method.name] = () => method(Model)
  })
})

module.exports = {
  User,
  Book,
  Review,
  Order,
  OrderBook,
  Session
}
