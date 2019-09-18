const Sequelize = require('sequelize')
const OrderBook = require('./orderBook.js')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM(
      'cart',
      'ordered',
      'shipped',
      'delivered',
      'cancelled'
    ),
    defaultValue: 'cart',
    validate: {
      isIn: [['cart', 'ordered', 'shipped', 'delivered', 'cancelled']]
    }
  }
})

Order.prototype.requestBook = async function(book) {
  await this.addBook(book)
  await OrderBook.updateQuantityPrice(book.id, this.id)
}

module.exports = Order
