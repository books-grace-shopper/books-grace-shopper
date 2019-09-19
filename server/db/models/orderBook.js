const Sequelize = require('sequelize')
const Book = require('./book')
const db = require('../db')

const OrderBook = db.define('order_book', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isInt: true,
      min: 0
    }
  },
  price: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
    validate: {
      isInt: true
    }
  }
})

OrderBook.findBookAndOrder = async function(bookId, orderId) {
  try {
    const curBookOrder = await OrderBook.findOne({
      where: {
        bookId: bookId,
        orderId: orderId
      }
    })
    const curBook = await Book.findByPk(bookId)
    return {bookOrder: curBookOrder, book: curBook}
  } catch (err) {
    console.error('METHOD findBookAndOrder BROKE')
  }
}

OrderBook.increaseQuantityPrice = async function(bookId, orderId) {
  try {
    const {bookOrder, book} = await OrderBook.findBookAndOrder(bookId, orderId)
    await bookOrder.update({
      quantity: ++bookOrder.quantity,
      price: bookOrder.price + book.price
    })
  } catch (err) {
    console.error('METHOD increaseQuantityPrice BROKE')
  }
}

OrderBook.decreaseQuantityPrice = async function(bookId, orderId) {
  try {
    const {bookOrder, book} = await OrderBook.findBookAndOrder(bookId, orderId)
    await bookOrder.update({
      quantity: --bookOrder.quantity,
      price: bookOrder.price - book.price
    })
    if (bookOrder.quantity === 0) {
      await book.removeOrder(orderId)
    }
  } catch (err) {
    console.error('METHOD decreaseQuantityPrice BROKE')
  }
}

module.exports = OrderBook
