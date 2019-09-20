const router = require('express').Router()
const {Review, Book} = require('../db/models')

router.get('/:bookId', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where: {bookId: req.params.bookId}
    })
    res.send(reviews)
  } catch (err) {
    next(err)
  }
})

module.exports = router
