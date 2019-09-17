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

OrderBook.updateQuantityPrice = async function(bookId, orderId) {
  const curOrder = await OrderBook.findOne({
    where: {
      bookId,
      orderId
    }
  })
  const book = await Book.findByPk(bookId)
  await curOrder.update({
    quantity: ++curOrder.quantity,
    price: curOrder.price + book.price
  })
}

module.exports = OrderBook
