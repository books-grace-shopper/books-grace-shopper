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

const parseTime = someTime => {
  let hr = someTime.slice(0, 2)
  let output
  if (hr > 12) {
    hr = hr - 12
    output = hr.toString() + ':' + someTime.slice(0, 2) + 'pm'
    return output
  } else {
    output = someTime + 'am'
    return output
  }
}

function parseDate(date) {
  const idx = date.indexOf('T')
  const year = date.slice(0, 4)
  const day = date.slice(5, 7)
  const month = date.slice(8, 10)
  let time = date.slice(idx + 1, idx + 6)
  time = parseTime(time)
  return `${day}/${month}/${year} at ${time}`
}

function getRating(reviews) {
  let avg = (
    reviews.reduce((accum, review) => {
      accum += review.rating
      return accum
    }, 0) / reviews.length
  ).toFixed(2)
  return avg
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
  randomNum,
  getRating
}
