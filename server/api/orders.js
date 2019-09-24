const router = require('express').Router()
const {Order, Book, User, Session} = require('../db/models')
const {die} = require('../../utils')
module.exports = router

router.post('/:id', async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.id)
    // const book = await Book.findByPk(req.body.bookId)
    await cart.updateBookQuantity(req.body.bookId, req.body.quantity)
    const newBooks = await cart.getBooksWithQuantities()
    cart.dataValues.books = newBooks
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.put('/:id/finalized', async (req, res, next) => {
  try {
    const oldCart = await Order.findByPk(req.params.id)
    await oldCart.purchaseSelf()
    const newCart = await Order.create()
    let user
    let guest
    if (req.user) {
      user = await User.findByPk(req.user.id)
      await user.addOrder(newCart)
    } else {
      guest = await Session.findByPk(req.session.id)
      await guest.setOrder(newCart)
    }
    res.send(newCart)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const cart = await Order.findByPk(req.params.id)
    console.log('REQ.BODY IS', req.body)
    await cart.updateBookQuantity(req.body.bookId, req.body.bookQuantity)
    const newBooks = await cart.getBooksWithQuantities()
    cart.dataValues.books = newBooks
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id/books/:bookId', async (req, res, next) => {
  try {
    console.log('req.body.bookId: ', req.body.bookId)
    const cart = await Order.findByPk(req.params.id)

    await cart.removeBook(req.params.bookId)

    const newBooks = await cart.getBooksWithQuantities()
    cart.dataValues.books = newBooks
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
