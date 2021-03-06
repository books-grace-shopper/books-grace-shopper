const {pickRandom, randomNum} = require('../utils')
const {User, Book, Order, Review, OrderBook} = require('../server/db/models')

async function guestAddsToCart() {
  try {
    const newOrder = await Order.create()
    const duplicateBook = await Book.findByPk(5)
    for (let i = 1; i <= 10; i++) {
      const book = await Book.findByPk(i)
      // await newOrder.requestBook(book)
      await newOrder.updateBookQuantity(book.id, 1)
    }
    // await newOrder.requestBook(duplicateBook)
    // await newOrder.requestBook(duplicateBook)
    await newOrder.updateBookQuantity(duplicateBook.id, 5)

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
    // const initialPrice = await order.getPrice()
    const books = await order.getBooks()
    const book = pickRandom(books)
    await order.updateBookQuantity(book.id, 0)
    // const priceAfterRemoval = await order.getPrice()
    // const mathError =
    //   initialPrice * 100 - book.price !== priceAfterRemoval * 100
    // if (mathError) {
    //   console.error('ERROR: MATH INVOLVING PRICE BROKEN')
    // }
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

  return order
}

////////////////////////////////////////////////////////////

async function createUserOrders(userId, numOfOrders) {
  await User.findByPk(userId)
  const bookCount = await Book.count()
  for (let i = 0; i < numOfOrders; ++i) {
    const order = await Order.create({
      userId: userId,
      status: ['ordered', 'shipped', 'delivered', 'cancelled'][randomNum(0, 3)]
    })
    const randomBookId = randomNum(1, bookCount)
    const randomQty = randomNum(1, 5)
    await OrderBook.findOrCreate({
      where: {
        orderId: order.id,
        bookId: randomBookId
      }
    })
    await order.updateBookQuantity(randomBookId, randomQty)
  }
}
////////////////////////////////////////////////////////////

async function userAddsToCart(userId) {
  const user = await User.findByPk(userId)
  const order = await user.findOrCreateCart()
  for (let i = userId; i <= userId + 10; i++) {
    const book = await Book.findByPk(i)
    await order.updateBookQuantity(book.id, 1)
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
  userBuysOrder,
  createUserOrders,
  randomNum
}
