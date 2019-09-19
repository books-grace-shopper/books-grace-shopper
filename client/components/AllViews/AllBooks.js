import React from 'react'
import {connect} from 'react-redux'
import {fetchBooks} from '../../store/allBooks.js'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
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
    this.props.fetchBooks()
  }
  render() {
    return (
      // <div className="all-books-container">
      <>
        <h1>All Books</h1>
        <div className="all-book-cards">
          {this.props.books ? (
            <MapBooks books={this.props.books} />
          ) : (
            <p>Loading</p>
          )}
        </div>
      </>
      // </div>
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
    fetchBooks: function() {
      dispatch(fetchBooks())
    }
  }
}

export default connect(mapState, mapDispatch)(AllBooks)
