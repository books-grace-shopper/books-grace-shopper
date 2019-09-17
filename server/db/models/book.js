const Sequelize = require('sequelize')
const db = require('../db')

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
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      isFloat: true,
      min: 0
    }
    // price cannot be a FLOAT; see DECIMAL instead
    //store price as an integer as cents  --> decimal types do not exist in JS
    //i.e. 5.99 --> 599
    //floats have gaps in numbers they can rep
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      isInt: true,
      min: 0
    }
  },
  //prob shouldn't subtract from inventory count
  //have another count like how many have we sold
  // i.e. shipped orders
  //inventory should be additive, not subtractive
  inventorySold: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://imageog.flaticon.com/icons/png/512/36/36601.png?size=1200x630f&pad=10,10,10,10&ext=png&bg=FFFFFFFF',
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

Book.showMagic = function() {
  console.log(Object.keys(Book.prototype))
}

module.exports = Book
