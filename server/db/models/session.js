const Sequelize = require('sequelize')
const db = require('../db')

const Session = db.define('session', {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  userId: Sequelize.STRING,
  expires: Sequelize.DATE,
  data: Sequelize.STRING(50000)
})

Session.findOrCreateByPk = async function(id) {
  const session = await Session.findByPk(id)
  if (!session) {
    const newSession = await Session.create({
      sid: id
    })
    return newSession
  }
  return session
}

Session.prototype.findOrCreateOrder = async function() {
  let cart
  cart = await this.getOrder()
  if (!cart) {
    cart = await this.createOrder()
  }
  cart.dataValues.books = await cart.getBooksWithQuantities()
  return cart
}

module.exports = Session
