import React from 'react'
import {connect} from 'react-redux'
import {fetchBooks} from '../../store/allBooks.js'
import {fetchBookTotal} from '../../store/allBookInfo.js'
import Card from 'react-bootstrap/Card'
import Jumbotron from 'react-bootstrap/Jumbotron'
import queryString from 'query-string'
import {Link} from 'react-router-dom'

/* SINGLE BOOK CARD ON THE PAGE */
function SingleBook(props) {
  const book = props.book
  return (
    <>
      <div key={book.id} className="single-book-card">
        <Card style={{width: '16rem'}}>
          <Link to={`/books/${book.id}`}>
            <Card.Img variant="top" src={book.imageUrl} />
          </Link>
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.author}</Card.Text>
            <Card.Text>Book Rating</Card.Text>
            <Card.Text>${book.price}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

/* MAP THROUGH ALL THE BOOKS AND GET SINGLE BOOK CARDS */
function MapBooks(props) {
  return props.books.map(book => {
    return <SingleBook key={book.id} book={book} />
  })
}

class AllBooks extends React.Component {
  constructor(props) {
    super(props)
    this.changePage = this.changePage.bind(this)
    this.getCurrentPage = this.getCurrentPage.bind(this)
  }
  getCurrentPage() {
    const pageNumber = Number(
      queryString.parse(this.props.location.search).pageNumber
    )
    return pageNumber || 1
  }
  changePage(newPageNumber) {
    this.props.location.search = `?${queryString.stringify({
      pageNumber: newPageNumber
    })}`
    this.props.history.push(this.props.location.search)
    this.props.fetchBooks(this.getCurrentPage())
  }
  componentDidMount() {
    this.props.fetchBooks(this.getCurrentPage())
    this.props.fetchBookTotal()
  }
  render() {
    return (
      <>
        {/* <Jumbotron>
            <h1>Hello, world!</h1>
            <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
            </p>
            </Jumbotron> */}

        <h1 className="all-books-header">Shop All Books</h1>
        {this.getCurrentPage() > 1 && (
          <button
            type="button"
            onClick={() => {
              this.changePage(this.getCurrentPage() - 1 || 1)
            }}
          >
            Previous
          </button>
        )}
        {Math.ceil(this.props.bookTotal / 10) < this.getCurrentPage() && (
          <button
            onClick={() => {
              this.changePage(this.getCurrentPage() + 1)
            }}
          >
            Next
          </button>
        )}
        <div className="all-book-cards">
          {this.props.books ? (
            <MapBooks books={this.props.books} />
          ) : (
            <p>Loading</p>
          )}
        </div>
      </>
    )
  }
}

function mapState(state) {
  return {
    books: state.books,
    bookTotal: state.allBookInfo.totalBooks
  }
}

function mapDispatch(dispatch) {
  return {
    fetchBooks: function(pageNumber) {
      dispatch(fetchBooks(pageNumber))
    },
    fetchBookTotal: function() {
      dispatch(fetchBookTotal())
    }
  }
}

export default connect(mapState, mapDispatch)(AllBooks)
