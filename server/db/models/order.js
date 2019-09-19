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
  try {
    await this.addBook(book)
    await OrderBook.increaseQuantityPrice(book.id, this.id)
  } catch (err) {
    console.error('METHOD requestBook ON Order BROKE')
  }
}

Order.prototype.unrequestBook = async function(book) {
  try {
    await OrderBook.decreaseQuantityPrice(book.id, this.id)
  } catch (err) {
    console.error('METHOD unrequestBook ON Order BROKE')
  }
}

Order.prototype.getPrice = async function() {
  try {
    const orderBooks = await OrderBook.findAll({
      where: {
        orderId: this.id
      }
    })
    return (
      orderBooks.reduce((sum, orderBook) => {
        sum += orderBook.price * orderBook.quantity
        return sum
      }, 0) / 100
    )
  } catch (err) {
    console.error('METHOD getPrice ON Order BROKE')
  }
}

Order.prototype.getBooksWithQuantities = async function() {
  try {
    const orderBooks = await OrderBook.findAll({
      where: {
        orderId: this.id
      }
    })
    const books = []
    try {
      for (let i = 0; i < orderBooks.length; i++) {
        const book = await Book.findByPk(orderBooks[i].bookId)
        book.quantity = orderBooks[i].quantity
        books.push(orderBooks[i])
      }
    } catch (err) {
      console.error('ERROR: GETTING BOOK ON getBooksWithQuantities FAILED')
    }
    return books
  } catch (err) {
    console.error('METHOD getBooksWithQuantities ON Order BROKE')
  }
}

Order.prototype.purchaseSelf = function() {
  throw new Error('THIS METHOD IS BROKEN AND NEEDS TO BE IMPLEMENTED')
}

Book.prototype.updateInventorySold = function(orderId) {
  throw new Error('THIS METHOD IS BROKEN AND NEEDS TO BE IMPLEMEMENTED')
}

module.exports = Order
