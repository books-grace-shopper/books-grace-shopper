const {Review, User, Book} = require('../server/db/models')
const {
  makeRandomUser,
  makeRandomBook,
  makeRandomReview,
  makeRandomizedArray
} = require('../utils')

async function createUserReviews(num) {
  const users = makeRandomizedArray(num, makeRandomUser)
  const reviews = makeRandomizedArray(num, makeRandomReview)
  const books = makeRandomizedArray(num, makeRandomBook)
  for (let i = 0; i < reviews.length; ++i) {
    const review = await Review.create(reviews[i])
    const user = await User.create(users[i])
    const book = await Book.create(books[i])
    await review.setUser(user)
    await review.setBook(book)
  }
}

module.exports = createUserReviews
