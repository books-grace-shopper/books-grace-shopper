import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {connect} from 'react-redux'

toast.configure()

function Checkout(props) {
  console.log('props.books', props.books) //I added this
  console.log('props.cart', props.cart) //I added this
  props.cart.books = product //I added this
  const [product] = React.useState({
    //unsure how to update this
    name: 'Tesla Roadster',
    price: 64998.67,
    description: 'Cool car'
  })

  async function handleToken(token, addresses) {
    try {
      const response = await axios.post(
        'http://localhost:8080/stripe/checkout',
        {
          token,
          product
        }
      )
      const {error, status} = response.data
      console.log(error, status)
      if (status === 'success') {
        toast('Success! Check email for details!', {type: 'success'})
      } else {
        toast('Oops! Something went wrong!', {
          type: 'error'
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <h2>Your Order</h2> {/*I added all of this here */}
      {props.books.map(book => (
        <div key={book.id}>
          <img src={book.imageUrl} />
          <h4>{book.title}</h4>
          <h5>{book.author}</h5>
          <h4>{book.price}</h4>
        </div>
      ))}
      {/* // <div className="container">
    //   <div className="product">
    //     <h1>{product.name}</h1>
    //     <h3>${product.price}</h3>
    //   </div> */}
      <StripeCheckout
        name="Bookazon"
        stripeKey="pk_test_I8ksxTCz5FRqZTny6zk5KTmi00y9ARKB0B"
        token={handleToken}
        shippingAddress
        billingAddress
        amount={
          props.cart.books.reduce((sum, book) => {
            sum += book.quantity * book.price
            return sum
          }, 0) / 100
        }
        // name={product.name}
      />
      {/* </div> */}
    </>
  )
}

const mapState = state => {
  // I added this
  return {
    books: state.books,
    cart: state.cart
  }
}

export default connect(mapState)(Checkout)
