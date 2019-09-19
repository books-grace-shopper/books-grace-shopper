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

router.put('/:id', async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.id)
    const book = await Book.findByPk(req.body.bookId)
    await cart.unrequestBook(book)
    const newBooks = await cart.getBooksWithQuantities()
    cart.dataValues.books = newBooks
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.id)
    const book = await Book.findByPk(req.body.bookId)
    console.log('BOOK ID', req.body.bookId)
    console.log('BOOK', book)
    await cart.removeBook(req.body.bookId)
    const newBooks = await cart.getBooksWithQuantities()
    // console.log('newBookslenth ', newBooks.length);
    cart.dataValues.books = newBooks
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
