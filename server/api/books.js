const router = require('express').Router()
const {Book} = require('../db/models')
const {die} = require('../../utils')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const books = await Book.findAll()
    books ? res.status(200).send(books) : die(404)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id)
    book.dataValues.reviews = await book.getReviews()
    book ? res.status(200).send(book) : die(404)
  } catch (error) {
    next(error)
  }
})
