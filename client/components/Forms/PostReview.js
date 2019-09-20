import React from 'react'
import Form, {Group, Label, Row, Control} from 'react-bootstrap/Form'

class PostReview extends React.Component {
  constructor() {
    super()
    this.state = {
      title: '',
      description: '',
      rating: 1
      // bookId
      // userId
    }
  }

  render() {
    return (
      <Form>
        <h3>review this book</h3>
        <Row>
          <Group>
            <Label>title</Label>
            <Control type="text" name="title" />
          </Group>
          <Group>
            <Label>your review...</Label>
            <Control as="textarea" name="description" />
          </Group>
        </Row>
      </Form>
    )
  }
}

export default PostReview
