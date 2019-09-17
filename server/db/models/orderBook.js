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

OrderBook.incrementOrderBookQuantity = async function(bookId, orderId) {
  const curOrder = await OrderBook.findOne({
    where: {
      bookId,
      orderId
    }
  });
  await curOrder.update({
    quantity: ++curOrder.quantity
  });
};

module.exports = OrderBook;
