const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Order = require('./order.js')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  address: {
    type: Sequelize.TEXT
  },
  name: {
    type: Sequelize.STRING
  }
})

module.exports = User

User.prototype.findCart = async function() {
  const cart = await this.getOrders()
  return cart.find(order => order.status === 'cart')
}

User.prototype.createCart = async function() {
  const cart = await this.findCart()
  if (cart) {
    throw new Error('USER CART ALREADY EXISTS')
  } else {
    const order = await Order.create()
    await this.addOrder(order)
    return order
  }
}

User.prototype.purchaseCart = async function() {
  const cart = await this.findCart()
  if (!cart) {
    throw new Error('USER CART DOES NOT EXIST')
  } else {
    await cart.purchaseSelf()
  }
}

Order.prototype.createUserWithCart = async function(user) {
  const newUser = await User.create(user)
  newUser.addOrder(this)
  return this
}

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
