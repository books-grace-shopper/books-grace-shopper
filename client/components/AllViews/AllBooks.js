import React from 'react';
import {connect} from 'react-redux';
import {fetchBooks} from '../../store/allBooks.js';

/* SINGLE BOOK CARD ON THE PAGE */
function SingleBook(props) {
  const book = props.book;
  return (
    <div key={book.id}>
      <hr />
      <h1>{book.title}</h1>
      <img style={{height: '200px', width: '200px'}} src={book.imageUrl} />
      <h2>{book.author}</h2>
      <h3>${book.price}</h3>
    </div>
  );
}

/* MAP THROUGH ALL THE BOOKS AND GET SINGLE BOOK CARDS */
function MapBooks(props) {
  return props.books.map(book => {
    return <SingleBook key={book.id} book={book} />;
  });
}

class AllBooks extends React.Component {
  componentDidMount() {
    this.props.fetchBooks();
  }
  render() {
    console.log('THE PROPS ON ALL BOOKS', this.props);
    return (
      <div>
        <h1>All Books</h1>
        <div>
          {this.props.books ? (
            <MapBooks books={this.props.books} />
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
    books: state.books
  };
}

function mapDispatch(dispatch) {
  return {
    fetchBooks: function() {
      dispatch(fetchBooks());
    }
  };
}

export default connect(mapState, mapDispatch)(AllBooks);
