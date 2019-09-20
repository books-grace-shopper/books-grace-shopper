import React from 'react'
import Card from 'react-bootstrap/Card'

export default function BookReviews(props) {
  console.log('props.reviews ', props.reviews)
  return (
    <div className="review-container">
      <h1 className="review-header">reviews for this book</h1>
      {/* POST review from goes here */}
      <div className="review-list">
        {props.reviews ? (
          props.reviews.map(review => {
            return (
              <Card key={review.id}>
                <h2>title: {review.title}</h2>
                <p>written by: {review.user.name}</p>
                <h3>rating: {review.rating}</h3>
                <p>description: {review.description}</p>
                <hr />
              </Card>
            )
          })
        ) : (
          <h3>loading reviews...</h3>
        )}
      </div>
    </div>
  )
}
