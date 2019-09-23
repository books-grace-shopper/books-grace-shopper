const router = require('express').Router()
const stripe = require('stripe')('sk_test_5uUTROJsWURwWhF2xHKmNXwv00Lgf5tKwA')
const uuid = require('uuid/v4')

router.post('/checkout', async (req, res, next) => {
  let status
  try {
    const {product, token} = req.body
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })

    const idempotencyKey = uuid()
    const charge = await stripe.charges.create({
      amount: product.price * 100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased ${product.name}`,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip
        }
      }
    })
    console.log('Charge:', {charge})
    status = 'success'
    res.json({status})
  } catch (error) {
    status = 'failure'
    res.json({error, status})
  }
})

module.exports = router
