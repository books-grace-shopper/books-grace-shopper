const router = require('express').Router()
const {User} = require('../db/models')
const {die} = require('../../utils')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'email']
    })
    if (!user) {
      die(404)
    }
    const cart = await user.findOrCreateCart()
    user.dataValues.cart = cart
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
