import React from 'react'
import {connect} from 'react-redux'
import {fetchBooks} from '../../store/allBooks.js'
import Card from 'react-bootstrap/Card'
import Jumbotron from 'react-bootstrap/Jumbotron'
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
  componentDidMount() {
    console.log('PROPS BEFORE MOUNT', this.props)
    this.props.fetchBooks(0)
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
        <button>Previous</button>
        <button>Next</button>
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
    books: state.books
  }
}

function mapDispatch(dispatch) {
  return {
    fetchBooks: function(pageNumber) {
      dispatch(fetchBooks(pageNumber))
    }
  }
}

export default connect(mapState, mapDispatch)(AllBooks)
