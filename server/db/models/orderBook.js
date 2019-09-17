const Sequelize = require('sequelize');
const db = require('../db');

const OrderBook = db.define('order_book', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isInt: true,
      min: 0
    }
  }
});

module.exports = OrderBook;
