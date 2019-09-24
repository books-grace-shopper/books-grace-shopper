import React from 'react'
import Card from 'react-bootstrap/Card'
import {connect} from 'react-redux'

function BookReviews(props) {
  return (
    <div className="review-container">
      <h1 className="review-header">Reviews For This Book:</h1>
      {/* POST review form goes here */}
      <div className="review-list">
        {props.reviews ? (
          props.reviews.map(review => {
            return (
              <div key={review.id} className="review-card">
                <h2>Review Title: {review.title}</h2>
                <p>Written by: {review.user.name}</p>
                <h3>Rating: {review.rating}</h3>
                <p>Description: {review.description}</p>
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
