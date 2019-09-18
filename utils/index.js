const {GENRES, AUTHORS, ORDER_STATUSES} = require('./constants')
const {
  pickRandom,
  makeRandomizedArray,
  makeRandomUser,
  makeRandomBook,
  makeRandomOrder,
  makeRandomReview,
  bulkGenerate
} = require('./randomGenerators')

function die(status) {
  const error = new Error()
  error.status = status
  throw error
}

module.exports = {
  pickRandom,
  makeRandomizedArray,
  makeRandomUser,
  makeRandomBook,
  makeRandomOrder,
  makeRandomReview,
  bulkGenerate,
  ORDER_STATUSES,
  GENRES,
  AUTHORS,
  die
}
