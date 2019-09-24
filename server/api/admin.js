const router = require('express').Router()
const {Order, Book} = require('../db/models')
const {die} = require('../../utils')
module.exports = router

router.get('/orders/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const orders = await Order.findAll({
        order: [['id', 'ASC']]
      })
      const ordersWithInfo = await Promise.all(
        orders.map(async order => {
          await order.getAllInfo()
          return order
        })
      )
      ordersWithInfo ? res.status(200).send(ordersWithInfo) : die(404)
    } else {
      throw Error('You do not have admin privileges!!!')
    }
  } catch (err) {
    next(err)
  }
})

router.get('/orders/status', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      console.log('req.query: ', req.query.status)
      const orders = await Order.findAll({
        where: {
          status: req.query.status
        },
        order: [['id', 'ASC']]
      })

      const ordersWithInfo = await Promise.all(
        orders.map(async order => {
          await order.getAllInfo()
          return order
        })
      )
      ordersWithInfo ? res.status(200).send(ordersWithInfo) : die(404)
    } else {
      throw Error('You do not have admin privileges!!!')
    }
  } catch (err) {
    next(err)
  }
})

router.put('/orders/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const orderToUpdate = await Order.findByPk(req.params.id)

      console.log('req.body ', req.body)
      await orderToUpdate.update(req.body)

      const orders = await Order.findAll({
        order: [['id', 'ASC']]
      })
      const ordersWithInfo = await Promise.all(
        orders.map(async order => {
          await order.getAllInfo()
          return order
        })
      )
      orderToUpdate ? res.status(200).send(ordersWithInfo) : die(404)
    } else {
      throw Error('You do not have admin privileges!!!')
    }
  } catch (err) {
    next(err)
  }
})

router.post('/books', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const newBook = await Book.create(req.body)
      newBook ? res.status(200).send(newBook) : die(404)
    } else {
      throw Error('You do not have admin privileges!!!')
    }
  } catch (err) {
    next(err)
  }
})
