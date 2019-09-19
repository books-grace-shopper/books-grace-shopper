const {GENRES, AUTHORS, ORDER_STATUSES, MODEL_METHODS} = require('./constants')

const {
  pickRandom,
  makeRandomizedArray,
  makeRandomUser,
  makeRandomBook,
  makeRandomOrder,
  makeRandomReview,
  pickRandomImage,
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
  pickRandomImage,
  ORDER_STATUSES,
  GENRES,
  AUTHORS,
  MODEL_METHODS,
  die
}
