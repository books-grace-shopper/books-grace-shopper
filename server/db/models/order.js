const Sequelize = require('sequelize')
const OrderBook = require('./orderBook.js')
const Book = require('./book.js')
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

Order.prototype.purchaseSelf = async function() {
  await this.update({
    status: 'ordered'
  })
  const books = await this.getBooks()
  await Promise.all(books.map(book => book.updateInventorySold(this.id)))
}

Book.prototype.updateInventorySold = async function(orderId) {
  const orderBook = await OrderBook.findOne({
    where: {
      bookId: this.id,
      orderId: orderId
    }
  })
  const quantity = orderBook.quantity
  const newSold = this.inventorySold + quantity
  await this.update({
    inventorySold: newSold
  })
}

module.exports = Order
