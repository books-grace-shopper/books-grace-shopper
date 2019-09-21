const router = require('express').Router()
const {Review, Book} = require('../db/models')

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    review.dataValues.user = await review.getUser()
    res.send(review)
  } catch (err) {
    next(err)
  }
})

router.delete('/:reviewId', async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.reviewId)
    if (!review) {
      res.sendStatus(404)
    } else {
      await review.destroy()
      res.end()
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
