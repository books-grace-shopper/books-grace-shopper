import React from 'react'
import {connect} from 'react-redux'
import Form, {Group, Label, Row, Control} from 'react-bootstrap/Form'
import {postReviewThunk} from '../../store/selectedBook'

class PostReview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      rating: 1,
      userId: this.props.userId,
      bookId: this.props.selectedBookId
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <Form
        onSubmit={event => {
          event.preventDefault()
          this.props.postReview(this.state)
          this.setState({
            title: '',
            description: '',
            rating: 5,
            userId: this.props.userId,
            bookId: this.props.selectedBookId
          })
        }}
      >
        <h3 id="review-title">review this book</h3>
        <Row>
          <Group>
            <Label>title</Label>
            <Control
              value={this.state.title}
              onChange={this.handleChange}
              type="text"
              name="title"
            />
          </Group>
          <Group>
            <Label>your review...</Label>
            <Control
              value={this.state.description}
              onChange={this.handleChange}
              as="textarea"
              name="description"
            />
          </Group>
          <Group>
            <Label>rating:</Label>
            <Control
              value={this.state.rating}
              onChange={this.handleChange}
              as="select"
              name="rating"
            >
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Control>
          </Group>
          <button type="submit">submit review</button>
        </Row>
      </Form>
    )
  }
}

const mapState = state => {
  return {
    userId: state.user.id,
    selectedBookId: state.selectedBook.id
  }
}

const mapDispatch = dispatch => {
  return {
    postReview: review => dispatch(postReviewThunk(review))
  }
}

export default connect(mapState, mapDispatch)(PostReview)
