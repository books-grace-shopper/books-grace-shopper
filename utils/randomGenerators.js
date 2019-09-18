const Chance = require('chance')
const {GENRES, AUTHORS, ORDER_STATUSES} = require('./constants')

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

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
    status: pickRandom(ORDER_STATUSES)
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

module.exports = {
  pickRandom,
  makeRandomizedArray,
  makeRandomUser,
  makeRandomBook,
  makeRandomOrder,
  makeRandomReview,
  bulkGenerate
}
