import React from 'react'
import Card from 'react-bootstrap/Card'
import {connect} from 'react-redux'

function BookReviews(props) {
  return (
    <div className="review-container">
      <h1 className="review-header">
        <strong>Reviews For This Book:</strong>
      </h1>
      {/* POST review form goes here */}
      <div className="review-list">
        {props.reviews ? (
          props.reviews.map(review => {
            return (
              <div key={review.id} className="review-card">
                <h2 className="reviews-header">
                  <strong>Review Title:</strong> {review.title}
                </h2>
                <p>
                  <strong>Written by:</strong> {review.user.name}
                </p>
                <h3>
                  <strong>Rating:</strong> {review.rating}
                </h3>
                <p>
                  <strong>Description:</strong> {review.description}
                </p>
                {props.userId === review.user.id && (
                  <button
                    type="button"
                    onClick={() => {
                      props.deleteReview(review.id)
                    }}
                  >
                    Delete Your Review
                  </button>
                )}
                <hr />
              </div>
            )
          })
        ) : (
          <h3>Loading Reviews...</h3>
        )}
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState)(BookReviews)
