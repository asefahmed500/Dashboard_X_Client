import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';
import PaymentCheckout from "../PaymentCheckout/PaymentCheckout";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);


// Debug: Log the Stripe public key to confirm it's loaded correctly
console.log('Stripe Public Key:', import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentWrapper = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentCheckout />
        </Elements>
    );
};

export default PaymentWrapper;
