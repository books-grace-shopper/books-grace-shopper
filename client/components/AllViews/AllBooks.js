import React from 'react'
import {connect} from 'react-redux'
import {fetchBooks} from '../../store/allBooks.js'
import {fetchBookTotal} from '../../store/allBookInfo.js'
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
    this.getCurrentPage = this.getCurrentPage.bind(this)
    this.getCurrentFilter = this.getCurrentFilter.bind(this)
  }
  getCurrentPage() {
    const query = queryString.parse(this.props.location.search)
    return Number(query.pageNumber) || 1
  }
  getCurrentFilter() {
    const query = queryString.parse(this.props.location.search)
    return query.pageFilter || 'none'
  }
  changePage(newPageNumber, newPageFilter) {
    this.props.location.search = `?${queryString.stringify({
      pageNumber: newPageNumber,
      pageFilter: newPageFilter
    })}`
    this.props.history.push(this.props.location.search)
    this.props.fetchBooks(this.getCurrentPage(), this.getCurrentFilter())
  }
  componentDidMount() {
    this.props.fetchBooks(this.getCurrentPage(), this.getCurrentFilter())
  }
  render() {
    return (
      <>
        <Navbar
          changePage={this.changePage}
          currentFilter={this.getCurrentFilter()}
          currentPage={this.getCurrentPage()}
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
    books: state.books,
    bookTotal: state.allBookInfo.totalBooks
  }
}

function mapDispatch(dispatch) {
  return {
    fetchBooks: function(pageNumber, pageFilter) {
      dispatch(fetchBooks(pageNumber, pageFilter))
    },
    fetchBookTotal: function() {
      dispatch(fetchBookTotal())
    }
  }
}

export default connect(mapState, mapDispatch)(AllBooks)
