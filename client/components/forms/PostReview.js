import React from 'react'
import {connect} from 'react-redux'
import {postReviewThunk} from '../../store/selectedBook'
import Button from 'react-bootstrap/Button'
import Form, {Group, Label, Row, Control} from 'react-bootstrap/Form'

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
        className="no-empty-fields"
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
        <h3 id="review-title">Review This Book</h3>
        <Row>
          <Group>
            <Label>Review Title</Label>
            <Control
              value={this.state.title}
              onChange={this.handleChange}
              type="text"
              name="title"
              required
            />
          </Group>
          <Group>
            <Label>Your Review...</Label>
            <Control
              value={this.state.description}
              onChange={this.handleChange}
              as="textarea"
              name="description"
              required
            />
          </Group>
          <Group>
            <Label>Rating:</Label>
            <Control
              className="filter"
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
          <Button type="submit" id="submit-review-button">
            Submit Review
          </Button>
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
    postReview: review => {
      return dispatch(postReviewThunk(review))
    }
  }
}

export default connect(mapState, mapDispatch)(PostReview)
