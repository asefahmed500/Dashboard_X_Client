import { useLocation } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useState } from 'react';

const PaymentCheckout = () => {
  const location = useLocation();
  const { name, role, salary, email } = location.state; // Include email from the state
  const axiosSecure = useAxiosSecure();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      Swal.fire('Error', 'Card element not found.', 'error');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create payment intent on the backend with email included
      const { data: { clientSecret } } = await axiosSecure.post('/create-payment-intent', {
        amount: salary * 100,
        name,
        role,
        email, // Include email in the request
      });

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name,
          },
        },
      });

      if (paymentResult.error) {
        Swal.fire('Payment failed', paymentResult.error.message, 'error');
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        Swal.fire('Payment Success', 'Salary has been paid successfully!', 'success');
        // Optionally, log the payment in your database or send notification
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment processing failed. Please try again.');
      Swal.fire('Error', 'Payment processing failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Payment Checkout</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="font-semibold">Name: {name}</p>
        <p className="font-semibold">Role: {role}</p>
        <p className="font-semibold">Salary: ${salary}</p>
        <p className="font-semibold">Email: {email}</p> {/* Display email for confirmation */}

        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
          <button className='btn btn-square' type="submit" disabled={!stripe || !elements || loading}>
            {loading ? 'Processing...' : `Pay $${salary}`}
          </button>
        </form>
        {error && <p className="error-message text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default PaymentCheckout;
