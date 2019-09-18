const {GENRES, AUTHORS, ORDER_STATUSES, MODEL_METHODS} = require('./constants')

const {
  pickRandom,
  makeRandomizedArray,
  makeRandomUser,
  makeRandomBook,
  makeRandomOrder,
  makeRandomReview,
  bulkGenerate
} = require('./randomGenerators')

const {showMagic, findOneRandom} = require('./modelMethods.js')

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
  MODEL_METHODS,
  showMagic,
  findOneRandom,
  die
}
