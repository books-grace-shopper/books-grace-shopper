const Sequelize = require('sequelize')
const OrderBook = require('./orderBook.js')
const db = require('../db')
const {pickRandomImage} = require('../../../utils')

const Book = db.define('book', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isInt: true,
      min: 0
    }
  },
  inventoryTotal: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isInt: true,
      min: 0
    }
  },
  inventorySold: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isInt: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: pickRandomImage,
    validate: {
      isUrl: true
    }
  },
  genre: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Book
