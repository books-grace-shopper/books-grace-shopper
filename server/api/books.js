const Sequelize = require('sequelize')
const router = require('express').Router()
const {Book} = require('../db/models')
const {die} = require('../../utils')
module.exports = router

router.get('/metadata', async (_, res, next) => {
  try {
    const books = await Book.findAll()
    const authors = Array.from(new Set(books.map(book => book.author)))
    const genres = Array.from(new Set(books.map(book => book.genre)))
    res.status(200).send({authors: authors, genres: genres})
  } catch (err) {
    next(err)
  }
})

function generateWhere(query) {
  delete query.pageNumber
  const finalWhere = Object.keys(query)
    .filter(key => query[key] && query[key] !== 'none')
    .reduce((where, key) => {
      switch (key) {
        case 'search':
          where.title = {
            [Sequelize.Op.like]: `%${query[key]}%`
          }
          return where
        default:
          where[key] = query[key]
          return where
      }
    }, {})
  if (Object.keys(finalWhere).length > 0) {
    return finalWhere
  } else {
    return false
  }
}

router.get('/', async (req, res, next) => {
  try {
    const query = {
      order: ['id'],
      offset: (req.query.pageNumber - 1) * 10,
      limit: 10
    }
    const where = generateWhere(req.query)
    if (where) {
      query.where = where
    }
    const books = await Book.findAll(query)
    books ? res.status(200).send(books) : die(404)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id)
    book.dataValues.reviews = await book.getReviewsWithUser()
    book ? res.status(200).send(book) : die(404)
  } catch (error) {
    next(error)
  }
})
