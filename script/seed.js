'use strict'
const db = require('../server/db')
const {
  User,
  Book,
  Order,
  Review,
  OrderBook,
  Session
} = require('../server/db/models')
const {
  guestAddsToCart,
  guestRemovesFromCart,
  guestSignsUpWithCart,
  userAddsToCart,
  userBuysOrder,
  createUserOrders
} = require('./seedStory')
const createUserReviews = require('./reviewsStory')

const {
  makeRandomUser,
  makeRandomBook,
  makeRandomOrder,
  makeRandomReview,
  bulkGenerate
} = require('../utils')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await User.create({
    email: 'Jimmy@test.com',
    address: '123 sunny st, glenco, IL 60025',
    name: 'Jimmy Smith',
    password: '123',
    isAdmin: true
  })

  await User.create({
    email: 'Dan@test.com',
    address: '123 fake st, Oak Park, IL 60025',
    name: 'Dan Fontana',
    password: '123',
    isAdmin: true
  })

  await User.create({
    email: 'Josh@test.com',
    address: '123 fake st, Oak Park, IL 60025',
    name: 'Josh Hoeflich',
    password: '123',
    isAdmin: true
  })

  await User.create({
    email: 'Christine@test.com',
    address: '123 main st, Glenview, IL, 60068',
    name: 'Christine Vargas',
    password: '123',
    isAdmin: false
  })

  await User.create({
    email: 'Jake@test.com',
    address: '123 main st, Glenview, IL, 60068',
    name: 'Jake Loew',
    password: '123',
    isAdmin: false
  })

  await User.create({
    email: 'Russel@test.com',
    address: '123 Diversy, Chicago, IL, 60068',
    name: 'Russel Kerns',
    password: '123',
    isAdmin: false
  })

  await User.create({
    email: 'Madison@test.com',
    address: '123 Diversy, Chicago, IL, 60068',
    name: 'Madison Carr',
    password: '123',
    isAdmin: false
  })

  await bulkGenerate(Book, 500, makeRandomBook)
  await createUserOrders(1, 12)
  await createUserOrders(2, 7)
  await createUserOrders(3, 13)
  await createUserOrders(4, 10)
  await createUserOrders(5, 5)
  await createUserOrders(6, 3)
  await createUserReviews(300)
  await guestAddsToCart()
  await guestRemovesFromCart()
  await guestSignsUpWithCart()

  // await bulkGenerate(User, 50, makeRandomUser);
  // await bulkGenerate(Order, 80, makeRandomOrder);
  // await userAddsToCart(3);
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
