import React from 'react';
import {connect} from 'react-redux';
import {fetchBooks} from '../../store/allBooks.js';

class AllBooks extends React.Component {
  async componentDidMount() {
    console.log(this.props);
    await this.props.fetchBooks();
  }
  render() {
    return (
      <div>
        <h1>All Books</h1>
        <div>{/*Some kind of map in here*/}</div>
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
