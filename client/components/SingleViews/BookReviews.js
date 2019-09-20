import React from 'react'

export default function BookReviews(props) {
  console.log('props.reviews ', props.reviews)
  return (
    <div className="review-container">
      <div className="review-header">Header</div>
      <div className="rating-add-review-container">BUTTON</div>
      <div className="review-list">
        {props.reviews ? (
          props.reviews.map(review => {
            return (
              <div key={review.id}>
                <p>title: {review.title}</p>
                <p>description: {review.description}</p>
                <p>rating: {review.rating}</p>
                {/* include user */}
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
