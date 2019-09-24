const {Review, User, Book} = require('../server/db/models')
const {
  makeRandomUser,
  makeRandomBook,
  makeRandomReview,
  makeRandomizedArray,
  randomNum
} = require('../utils')

async function createUserReviews(numReviews) {
  const reviews = makeRandomizedArray(numReviews, makeRandomReview)
  const bookCount = await Book.count()
  const userCount = await User.count()
  for (let i = 0; i < reviews.length; ++i) {
    const review = await Review.create(reviews[i])
    const user = await User.findByPk(randomNum(1, userCount))
    const book = await Book.findByPk(randomNum(1, bookCount))
    await review.setUser(user)
    await review.setBook(book)
  }
}

module.exports = createUserReviews
