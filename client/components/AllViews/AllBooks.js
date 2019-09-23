import React from 'react'
import {connect} from 'react-redux'
import {fetchBooks} from '../../store/allBooks.js'
import Card from 'react-bootstrap/Card'
import queryString from 'query-string'
import {Link} from 'react-router-dom'
import {default as Navbar} from './AllBooksNavbar.js'

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
    this.getCurrentParams = this.getCurrentParams.bind(this)
  }
  getCurrentParams() {
    return queryString.parse(this.props.location.search)
  }
  changePage(newParams) {
    this.props.location.search = `?${queryString.stringify(newParams)}`
    this.props.history.push(this.props.location.search)
    this.props.fetchBooks(newParams)
  }
  componentDidMount() {
    this.props.fetchBooks(this.getCurrentParams())
  }
  render() {
    return (
      <>
        <Navbar
          changePage={this.changePage}
          currentParams={this.getCurrentParams()}
        />
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
    fetchBooks: function(pageNumber, pageFilter) {
      dispatch(fetchBooks(pageNumber, pageFilter))
    }
  }
}

export default connect(mapState, mapDispatch)(AllBooks)
