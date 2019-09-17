const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  title: {},
  user: {},
  description: {
    type: Sequelize.TEXT
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    },
    defaultValue: 0
  }
})

Review.showMagic = function() {
  console.log(Object.keys(Review.prototype))
}

module.exports = Review
