const Chance = require('chance')

const GENRES = [
  'fiction',
  'non-fiction',
  'romance',
  'biography',
  'kids',
  'teens',
  'how-to',
  'historical',
  'cooking',
  'self-help',
  'easter egg',
  'religion',
  'horror',
  'sci-fi',
  'fantasy',
  'anime',
  'humor',
  'mystery'
]

function createAuthors(num) {
  const names = []
  const chance = new Chance()
  for (let i = 0; i < num; ++i) {
    const name = chance.name()
    names.push(name)
  }
  return names
}

const AUTHORS = createAuthors(50)

const ORDER_STATUSES = ['cart', 'ordered', 'shipped', 'delivered', 'cancelled']

module.exports = {
  ORDER_STATUSES,
  GENRES,
  AUTHORS
}
