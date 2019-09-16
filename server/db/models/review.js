const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  description: {
    type: Sequelize.TEXT
  },
  stars: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    },
    defaultValue: 0
  }
});

module.exports = Review;
