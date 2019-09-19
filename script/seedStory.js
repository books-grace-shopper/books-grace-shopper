const {pickRandom} = require('../utils')
const {User, Book, Order, Review, OrderBook} = require('../server/db/models')

async function guestAddsToCart() {
  try {
    const newOrder = await Order.create()
    const duplicateBook = await Book.findByPk(5)
    for (let i = 1; i <= 10; i++) {
      const book = await Book.findByPk(i)
      await newOrder.requestBook(book)
    }
    await newOrder.requestBook(duplicateBook)
    await newOrder.requestBook(duplicateBook)
    const books = await newOrder.getBooksWithQuantities()
    for (let i = 0; i < books.length; i++) {
      let booksObj = {}
      booksObj.quantity = books[i].quantity
      booksObj.id = books[i].bookId
    }
    return newOrder
  } catch (err) {
    console.error('METHOD guestAddsToCart IN seedStory FAILED')
  }
}

async function guestRemovesFromCart() {
  try {
    const order = await guestAddsToCart()
    const initialPrice = await order.getPrice()
    const books = await order.getBooks()
    const book = pickRandom(books)
    await order.unrequestBook(book)
    const priceAfterRemoval = await order.getPrice()
    const mathError =
      initialPrice * 100 - book.price !== priceAfterRemoval * 100
    if (mathError) {
      console.error('ERROR: MATH INVOLVING PRICE BROKEN')
    }
  } catch (err) {
    console.error('METHOD guestRemovesFromCart IN seedStory FAILED')
  }
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
  const order = await user.findOrCreateCart()
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
