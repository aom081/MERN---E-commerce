import {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import stripeService from '../services/stripe.service'

const PaymentButton = ({cartItem}) => {
  const {user} = useContext(AuthContext);
  const handleCheckOut = () => {
    stripeService.createCheckoutSession({
      cart: cartItem,
      email: user.email
    })
    .then((res) => {
      if (res.data.url) {
        window.location.href = res.data.url
      }
    })
    .catch((error) => {
      console.log(error.message);
    })
  }
  return (
    <>
    <button onClick={() => handleCheckOut()} className='btn btn-md bg-red text-white px-8 py-1'>
      Proceed to Payment
    </button>
    </>
  )
}

export default PaymentButton
