import React from 'react'
import {connect} from 'react-redux'
import {fetchBooks} from '../../store/allBooks.js'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'

/* SINGLE BOOK CARD ON THE PAGE */
function SingleBook(props) {
  const book = props.book
  return (
    <>
      <hr />
      <div key={book.id} className="single-book-card">
        <Card style={{width: '16rem'}}>
          <Card.Img variant="top" src={book.imageUrl} />
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>{book.author}</Card.Text>
            <Card.Text>Book Rating</Card.Text>
            <Card.Text>${book.price}</Card.Text>
          </Card.Body>
        </Card>
        {/* <hr />
        <img style={{height: '75px', width: '75px'}} src={book.imageUrl} />
        <p>{book.title}</p>
        <p>{book.author}</p>
        <p>Book rating</p>
        <p>${book.price}</p> */}
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
    console.log('THE PROPS ON ALL BOOKS', this.props)
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
