const router = require('express').Router()
const {User, Session} = require('../db/models')

module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', async (req, res, next) => {
  try {
    if (req.user) {
      const orderHistory = await req.user.getOrders()
      req.user.dataValues.orderHistory = await Promise.all(
        orderHistory.map(async order => {
          const books = await order.getBooksWithQuantities()
          const subtotal = await order.getPrice()
          // console.log('')
          order.dataValues.books = books
          order.dataValues.subtotal = subtotal
          return order
        })
      )
      req.user.dataValues.orderHistory = req.user.dataValues.orderHistory.filter(
        order => order.status !== 'cart'
      )
      res.json(req.user)
    } else {
      const session = await Session.findOrCreateByPk(req.session.id)
      const order = await session.findOrCreateOrder()
      res.json(order)
    }
  } catch (err) {
    console.error(err)
  }
})

router.use('/google', require('./google'))
