const {pickRandom} = require('../utils')
const {User, Book, Order, Review, OrderBook} = require('../server/db/models')

async function guestAddsToCart() {
  const newOrder = await Order.create()
  const duplicateBook = await Book.findByPk(5)
  for (let i = 1; i <= 10; i++) {
    const book = await Book.findByPk(i)
    await newOrder.requestBook(book)
  }
  await newOrder.requestBook(duplicateBook)
  await newOrder.requestBook(duplicateBook)
  return newOrder
}

async function guestRemovesFromCart() {
  const order = await guestAddsToCart()
  const initialPrice = await order.getPrice()
  console.log('INITIAL PRICE OF ORDER', initialPrice)
  const books = await order.getBooks()
  const book = pickRandom(books)
  console.log('PRICE OF BOOK TO REMOVE', book.price / 100)
  await order.unrequestBook(book)
  const priceAfterRemoval = await order.getPrice()
  await console.log('PRICE AFTER REMOVAL', priceAfterRemoval)
}

async function guestSignsUpWithCart() {
  const order = await guestAddsToCart()
  const testUser = {
    email: 'userWith12Items@gmail.com',
    address: '344 Sunrise Circle',
    name: 'Jim',
    password: '1234'
  }
  await order.createUserWithCart(testUser)
  return order
}

async function userAddsToCart(id) {
  const user = await User.findByPk(id)
  await user.createCart()
  const order = await user.findCart()
  for (let i = id; i <= id + 10; i++) {
    const book = await Book.findByPk(i)
    await order.requestBook(book)
  }
  return user
}

async function userBuysOrder(id) {
  const user = await userAddsToCart(id)
  await user.purchaseCart()
}

module.exports = {
  guestAddsToCart,
  guestRemovesFromCart,
  guestSignsUpWithCart,
  userAddsToCart,
  userBuysOrder
}
