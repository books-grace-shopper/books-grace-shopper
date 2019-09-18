const {User, Book, Order, Review, OrderBook} = require('../server/db/models')

async function guestAddsToCart() {
  const newOrder = await Order.create()
  const books = []
  for (let i = 1; i <= 10; i++) {
    const book = await Book.findByPk(i)
    books.push(book)
  }
  const duplicateBook = await Book.findByPk(5)
  await newOrder.requestBook(duplicateBook)
  await newOrder.requestBook(duplicateBook)
  return newOrder
}

async function guestSignsUpWithCart() {
  const order = await guestAddsToCart()
}

async function userMakesOrder() {
  const user = await User.findByPk(5)
  const order = await Order.findByPk(3)
}

async function userBuysOrder() {
  const user = await User.findByPk(7)
}

async function userCancelsOrder() {
  const user = await User.findByPk(3)
}

module.exports = {
  guestAddsToCart,
  guestSignsUpWithCart,
  userMakesOrder,
  userBuysOrder,
  userCancelsOrder
}
