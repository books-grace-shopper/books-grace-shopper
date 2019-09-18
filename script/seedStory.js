const {User, Book, Order, Review, OrderBook} = require('../server/db/models')

async function guestAddsToCart() {
  const newOrder = await Order.create()
  const books = []
  for (let i = 1; i <= 10; i++) {
    const book = await Book.findByPk(i)
    books.push(book)
  }
  await Promise.all(books.map(book => newOrder.requestBook(book)))
  const duplicateBook = await Book.findByPk(5)
  await newOrder.requestBook(duplicateBook)
  await newOrder.requestBook(duplicateBook)
  /*
   * For checking the price method:
   * const price = await newOrder.getPrice();
   */
  return newOrder
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
  const books = []
  for (let i = id; i <= id + 10; i++) {
    const book = await Book.findByPk(i)
    books.push(book)
  }
  await Promise.all(books.map(book => order.requestBook(book)))
  return user
}

async function userBuysOrder(id) {
  const user = await userAddsToCart(id)
  // const order = await user.findCart();
  await user.purchaseCart()
}

module.exports = {
  guestAddsToCart,
  guestSignsUpWithCart,
  userAddsToCart,
  userBuysOrder
}
