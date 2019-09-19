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
  await OrderBook.increaseQuantityPrice(book.id, this.id)
}

Order.prototype.unrequestBook = async function(book) {
  console.log('WRITE ME! :)')
  // await OrderBook.decreaseQuantityPrice(book.id, this.id);
}

Order.prototype.getPrice = async function() {
  const orderBooks = await OrderBook.findAll({
    where: {
      orderId: this.id
    }
  })
  return (
    orderBooks.reduce((sum, orderBook) => {
      sum += orderBook.price
      return sum
    }, 0) / 100
  )
}

Order.prototype.findBooks = async function() {
  const orderBooks = await OrderBook.findAll({
    where: {
      orderId: this.id
    }
  })
  console.log('WRITE ME! YOU CAN DO IT! :)')
  // return orderBook.price / 100;
}

Order.prototype.isCart = function() {
  return this.status === 'cart'
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
