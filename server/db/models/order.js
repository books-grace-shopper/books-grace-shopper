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

Order.prototype.updateBookQuantity = async function(bookId, newQuantity) {
  if (newQuantity === 0) {
    await this.removeBook(bookId)
    return this.getBooksWithQuantities()
  } else {
    const [orderBook] = await OrderBook.findOrCreate({
      where: {
        orderId: this.id,
        bookId: bookId
      }
    })
    await orderBook.update({
      bookQuantity: newQuantity
    })

    return this.getBooksWithQuantities()
  }
}

Order.prototype.getBookQuantity = async function(bookId) {
  const orderBook = await OrderBook.findOne({
    where: {
      bookId: bookId,
      orderId: this.id
    }
  })
  return orderBook.bookQuantity
}

Order.prototype.getPrice = async function() {
  throw Error('WRITE ME')
}

Order.prototype.getBooksWithQuantities = async function() {
  try {
    const orderBooks = await OrderBook.findAll({
      where: {
        orderId: this.id
      },
      order: [['bookId', 'DESC']]
    })
    const books = []
    try {
      for (let i = 0; i < orderBooks.length; i++) {
        const book = await Book.findByPk(orderBooks[i].bookId)
        book.dataValues.quantity = orderBooks[i].quantity
        books.push(book)
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
