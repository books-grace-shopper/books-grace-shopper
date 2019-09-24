const mocha = require('mocha')
const React = require('react')
const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
const request = require('supertest')
const app = require('../server/index.js')
const {expect} = require('chai')
const {Order, Book, Review, Session} = require('../server/db/models')
const bookReducer = require('../client/store/allBooks.js')
const {
  SelectedBookCard
} = require('../client/components/SingleViews/SelectedBook.js')

describe('Review tests', () => {
  const testReview = {
    id: 600,
    title: 'Test',
    description: 'This is a test',
    rating: 3
  }
  describe('Reviews and Session model', () => {
    it('Should have a title, description, and a rating', async () => {
      const review = await Review.create(testReview)
      expect(review.title).to.equal('Test')
      expect(review.description).to.equal('This is a test')
      expect(review.rating).to.equal(3)
    })
    it('Prototype method on session should work', async () => {
      const session = await Session.findOrCreateByPk('cake')
      const newSession = await Session.findOrCreateByPk('cake')
      expect(session.sid).to.equal('cake')
      expect(newSession.sid).to.equal(session.sid)
    })
  })

  describe('Review route tests', () => {
    it('Can delete a single review', async () => {
      const res = await request(app).delete('/api/reviews/600')
      expect(res.status).to.equal(200)
      const review = await Review.findByPk(600)
      expect(review).to.equal(null)
    })
    it('Can post a review to the website', async () => {
      const res = await request(app)
        .post('/api/reviews')
        .send(testReview)
      expect(res.status).to.equal(200)
      const review = await Review.findByPk(600)
      expect(review.title).to.equal('Test')
    })
  })

  describe('Book route tests', () => {
    it('Can get the first 10 books', async () => {
      const res = await request(app).get('/api/books?pageNumber=1')
      expect(res.status).to.equal(200)
      expect(res.body)
        .to.have.property('length')
        .equal(10)
      expect(res.body.map(book => book.id)).to.deep.equal([
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10
      ])
    })
  })

  describe('Cart update test', () => {
    it('Can update the cart', async () => {
      const cart = await Order.create()
      const book = await Book.findByPk(5)
      await cart.addBook(book.id)
      const res = await request(app)
        .put(`/api/orders/${cart.id}`)
        .send({
          bookId: book.id,
          bookQuantity: 5
        })
      expect(res.body.books)
        .to.have.property('length')
        .equal(1)
      expect(res.body.books[0])
        .to.have.property('quantity')
        .equal(5)
    })
  })

  describe('Review reducer test', () => {
    it('Updates state correctly given a new array.', () => {
      const reduceObject = {type: 'GET_BOOKS', books: [1, 2, 3, 4]}
      expect(bookReducer.default([], reduceObject)).to.deep.equal([1, 2, 3, 4])
    })
  })

  describe('SelectedBookCart', () => {
    const selectedBook = enzyme.shallow(
      <SelectedBookCard
        selectedBook={{
          title: 'Test',
          author: 'Jimmy',
          price: '50'
        }}
        cart={{books: []}}
      />
    )
    it('Displays a selected book correctly', () => {
      const text = selectedBook.find('p').map(par => par.text())
      expect(text).to.deep.equal(['Test', 'By: Jimmy', 'RATING', '$50'])
    })
  })
})
