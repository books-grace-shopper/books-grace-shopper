const User = require('./user');
const Book = require('./book');
const Review = require('./review');
const Order = require('./order');

Book.belongsToMany(User, {through: 'user_book'});
Book.belongsToMany(Order, {through: 'order_book'});
Book.hasMany(Review);

User.belongsToMany(Book, {through: 'user_book'});
User.hasMany(Review);
User.hasMany(Order);

Review.belongsTo(User);
Review.belongsTo(Book);

Order.belongsTo(User);
Order.belongsToMany(Book, {through: 'order_book'});

module.exports = {
  User,
  Book,
  Review,
  Order
};
