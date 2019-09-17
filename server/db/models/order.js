const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('cart', 'ordered', 'shipped', 'delivered', 'canceled'),
    defaultValue: 'cart',
    validate: {
      isIn: [['cart', 'ordered', 'shipped', 'delivered', 'canceled']]
    }
  },
  totalPrice: {}
})

Order.showMagic = function() {
  console.log(Object.keys(Order.prototype))
}

module.exports = Order
