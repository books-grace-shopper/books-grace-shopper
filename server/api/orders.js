const router = require('express').Router()
const {Order, Book} = require('../db/models')
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

// get all orders for admin
router.get('/admin/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const orders = await Order.findAll()
      const ordersWithUsers = await Promise.all(
        orders.map(async order => {
          await order.getAllInfo()
          return order
        })
      )
      ordersWithUsers ? res.status(200).send(ordersWithUsers) : die(404)
    } else {
      throw Error('You do not have admin privileges!!!')
    }
  } catch (err) {
    next(err)
  }
})
