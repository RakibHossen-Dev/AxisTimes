import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
// import CheckoutForm from "src\pages\Payment\CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
    <div className="min-h-screen">
      <Elements stripe={stripePromise}>
        <CheckoutForm></CheckoutForm>
      </Elements>
      {/* <div className="max-w-lg mx-auto bg-white text-gray-900 rounded-lg shadow-2xl p-8 mt-20">
        <h1 className="text-3xl font-bold text-center mb-6">
          Complete Your Payment
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter your card details to confirm the subscription.
        </p>

        <label className="block mb-4">
          <span className="text-lg font-semibold">Card Number</span>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full mt-2 p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-rose-500"
          />
        </label>

        <label className="block mb-4">
          <span className="text-lg font-semibold">
            Choose Subscription Period
          </span>
          <select
            className="w-full mt-2 p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-rose-500"
          >
            <option value="1">1 Minute </option>
            <option value="5">5 Days </option>
            <option value="10">10 Days</option>
          </select>
        </label>

        <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-lg transition-all duration-300">
          Pay Now
        </button>
      </div> */}
    </div>
  );
};

export default Payment;
