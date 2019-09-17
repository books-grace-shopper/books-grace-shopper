'use strict'
const Chance = require('chance')
const db = require('../server/db')
const {User, Book, Order, Review, OrderBook} = require('../server/db/models')
const {GENRES, AUTHORS, STATUSES, pickRandom} = require('../utils')

function makeRandomizedArray(num, makeRandomFunc) {
  const arr = []
  for (let i = 0; i < num; ++i) {
    const row = makeRandomFunc()
    arr.push(row)
  }
  return arr
}

function makeRandomUser() {
  const chance = new Chance()
  return {
    email: chance.email(),
    password: chance.string({length: 10}),
    address: chance.address(),
    name: chance.name()
  }
}

function makeRandomBook() {
  const chance = new Chance()
  return {
    title: chance.word(),
    description: chance.paragraph(),
    price: chance.integer({min: 0, max: 2000000000}),
    inventoryTotal: chance.integer({min: 1001, max: 2000000}),
    inventorySold: chance.integer({min: 0, max: 1000}),
    genre: pickRandom(GENRES),
    author: pickRandom(AUTHORS)
  }
}

function makeRandomOrder() {
  return {
    status: pickRandom(STATUSES)
  }
}

function makeRandomReview() {
  const chance = new Chance()
  return {
    title: chance.sentence(),
    description: chance.paragraph(),
    rating: chance.integer({min: 0, max: 5})
  }
}

function bulkGenerate(Model, num, makeRandomFunc) {
  return Model.bulkCreate(makeRandomizedArray(num, makeRandomFunc), {
    returning: true
  })
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')
  await bulkGenerate(Book, 200, makeRandomBook)
  await bulkGenerate(User, 100, makeRandomUser)
  await bulkGenerate(Review, 80, makeRandomReview)
  await bulkGenerate(Order, 80, makeRandomOrder)
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
