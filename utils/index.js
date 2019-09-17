const {GENRES, AUTHORS, STATUSES} = require('./constants')

function die(status) {
  const error = new Error()
  error.status = status
  throw error
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = {
  STATUSES,
  GENRES,
  AUTHORS,
  die,
  pickRandom
}
