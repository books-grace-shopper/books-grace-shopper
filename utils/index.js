const {GENRES, AUTHORS, ORDER_STATUSES, MODEL_METHODS} = require('./constants')

const {
  pickRandom,
  makeRandomizedArray,
  makeRandomUser,
  makeRandomBook,
  makeRandomOrder,
  makeRandomReview,
  pickRandomImage,
  bulkGenerate,
  randomNum
} = require('./randomGenerators')

function die(status) {
  const error = new Error()
  error.status = status
  throw error
}

function parseDate(date) {
  const idx = date.indexOf('T')
  const year = date.slice(0, 4)
  const day = date.slice(5, 7)
  const month = date.slice(8, 10)
  const time = date.slice(idx + 1, idx + 6)
  return `${day}/${month}/${year} at ${time}`
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
  die,
  parseDate,
  randomNum
}
