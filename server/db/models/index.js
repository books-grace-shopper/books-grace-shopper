const User = require('./user');
const Book = require('./book');
const Review = require('./review');
const Order = require('./order');
const OrderBook = require('./orderBook.js');

Book.belongsToMany(Order, {through: OrderBook});
Book.hasMany(Review);

User.hasMany(Review);
User.hasMany(Order);

Review.belongsTo(User);
Review.belongsTo(Book);

Order.belongsTo(User);
Order.belongsToMany(Book, {through: OrderBook});

module.exports = {
  User,
  Book,
  Review,
  Order,
  OrderBook
};
