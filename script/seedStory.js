const {
  makeRandomBook,
  makeRandomUser,
  makeRandomOrder,
  makeNonCartOrder,
  bulkGenerate
} = require('../utils')
const {User, Book, Order, Review, OrderBook} = require('../server/db/models')

// USERS WITH MULTIPLE FINISHED ORDERS
// AUTHORS WITH BOOKS

async function makeManualUser() {
  await User.create({
    email: 'manualUser@test.com',
    address: '123 sunny st, glenco, IL 60025',
    name: 'Jimmy Smith',
    password: '123'
  })
}

async function makeUsersWithOrders(howMany) {
  const users = await bulkGenerate(User, howMany, makeRandomUser)
  const books = await bulkGenerate(Book, howMany, makeRandomBook)
  const randomOrders = await bulkGenerate(Order, howMany, makeRandomOrder)
  const nonCartOrders = await bulkGenerate(Order, howMany, makeNonCartOrder)

  await Promise.all(
    randomOrders.map((order, index) => order.addBook(books[index]))
  )
  await Promise.all(
    nonCartOrders.map((order, index) => order.addBook(books[index]))
  )
  await Promise.all(
    users.map((user, index) => user.addOrder(randomOrders[index]))
  )
  await Promise.all(
    users.map((user, index) => user.addOrder(nonCartOrders[index]))
  )

  return users
}

module.exports = {
  makeManualUser,
  makeUsersWithOrders
}
