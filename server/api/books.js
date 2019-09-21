const router = require('express').Router()
const {Book} = require('../db/models')
const {die} = require('../../utils')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll({
      order: ['id'],
      offset: req.query.pageNumber * 10,
      limit: 10
    })
    books ? res.status(200).send(books) : die(404)
  } catch (error) {
    next(error)
  }
})

router.get('/limit', async (_, res, next) => {
  try {
    const count = await Book.count()
    res.status(200).send(count)
  } catch (err) {
    next(err)
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
