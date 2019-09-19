const router = require('express').Router()
const {Order, Book} = require('../db/models')
const {die} = require('../../utils')
module.exports = router

router.post('/:id', async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.id)
    const book = await Book.findByPk(req.body.bookId)
    await cart.requestBook(book)
    const newBooks = await cart.getBooksWithQuantities()
    cart.dataValues.books = newBooks
    res.json(cart)
  } catch (error) {
    next(error)
  }
})
