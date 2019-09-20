import React from 'react'
import Card from 'react-bootstrap/Card'
import {connect} from 'react-redux'

function BookReviews(props) {
  return (
    <div className="review-container">
      <h1 className="review-header">reviews for this book</h1>
      {/* POST review from goes here */}
      <div className="review-list">
        {props.reviews ? (
          props.reviews.map(review => {
            return (
              <div key={review.id} className="review-card">
                <h2>title: {review.title}</h2>
                <p>written by: {review.user.name}</p>
                <h3>rating: {review.rating}</h3>
                <p>description: {review.description}</p>
                {props.userId === review.user.id && (
                  <button
                    type="button"
                    onClick={() => {
                      props.deleteReview(review.id, props.reviews)
                    }}
                  >
                    delete your review
                  </button>
                )}
                <hr />
              </div>
            )
          })
        ) : (
          <h3>loading reviews...</h3>
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

// const mapDispatch = (dispatch) => {
// 	return {
//    deleteReview: (reviewId, book) => dispatch(deleteReviewThunk(reviewId, book))
// 	};
// };

export default connect(mapState)(BookReviews)
