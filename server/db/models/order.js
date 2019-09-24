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
  const books = await this.getBooksWithQuantities()
  return books.reduce((sum, book) => {
    sum += book.dataValues.price * book.dataValues.quantity
    return sum
  }, 0)
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
        book.dataValues.quantity = orderBooks[i].bookQuantity
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
Order.prototype.getAllInfo = async function() {
  try {
    this.dataValues.user = await this.getUser()
    this.dataValues.books = await this.getBooksWithQuantities()
    this.dataValues.price = await this.getPrice()
    return this
  } catch (err) {
    console.error('ERROR: method getAllInfo ON Order BROKE')
    throw err
  }
}

Order.prototype.purchaseSelf = async function() {
  const books = await this.getBooksWithQuantities()
  for (let i = 0; i < books.length; i++) {
    const newInventorySold =
      books[i].dataValues.inventorySold + books[i].dataValues.quantity
    await books[i].update({
      inventorySold: newInventorySold
    })
  }
  await this.update({
    status: 'ordered'
  })
}

module.exports = Order
