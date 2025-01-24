// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useContext, useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { AuthContext } from "../../providers/AuthProvider";

// const CheckoutForm = () => {
//   // const {user} = useCOn
//   const axiosSecure = useAxiosSecure();
//   const [error, setError] = useState("");
//   const [plan, setPlan] = useState("1min");
//   const [clientSecret, setClientSecret] = useState("");
//   const [createdTime, setCreatedTime] = useState("");
//   const { user } = useContext(AuthContext);
//   const stripe = useStripe();
//   const elements = useElements();

//   useEffect(() => {
//     axiosSecure.post("/create-payment-intent", { plan }).then((res) => {
//       // console.log(res.data.client_secret);
//       // setClientSecret(res.data.client_secret);
//       if (res.data.clientSecret) {
//         setClientSecret(res.data.clientSecret);
//       } else {
//         console.error("Client secret not received");
//       }
//     });
//   }, [plan, axiosSecure]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);
//     if (card == null) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     if (error) {
//       console.log("payment error", error);
//       setError(error.message);
//     } else {
//       console.log("payment method", paymentMethod);
//       setError("");
//       // const date = new Date(paymentMethod.created * 1000);
//       // const subscriptionTime = date.toLocaleString();
//       // setCreatedTime(subscriptionTime);
//     }

//     const { paymentIntent, error: confirmError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             email: user?.email,
//             name: user?.displayName,
//           },
//         },
//       });

//     if (confirmError) {
//       console.log("confirm Error");
//     } else {
//       console.log("payment Intent", paymentIntent);

//       const subscriptionTime = new Date(paymentIntent.created * 1000).toISOString();
//       // const date = new Date(paymentIntent.created * 1000);
//       // const subscriptionTime = date.toLocaleString();
//       // setCreatedTime(subscriptionTime);
//       axiosSecure
//         .patch(`/takenPremium/${user.email}`, {
//           premiumTaken: subscriptionTime,
//         })
//         .then((res) => {
//           refetch();
//           if (res.data.modifiedCount) {
//             Swal.fire({
//               position: "top-end",
//               icon: "success",
//               title: `Successfully Subscription Taken`,
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           }
//         });
//     }
//   };
//   console.log(plan, createdTime);

//   const currentTime = new Date();
// console.log(currentTime);
//   return (
//     <div className="max-w-lg mx-auto bg-white text-gray-900 rounded-lg shadow-2xl p-8 mt-20">
//       <form onSubmit={handleSubmit}>
//         <label className="block mb-2 font-medium text-gray-700">
//           Select Plan
//         </label>
//         <select
//           value={plan}
//           onChange={(e) => setPlan(e.target.value)}
//           className="w-full mb-4 p-2 border border-gray-300 rounded"
//           required
//         >
//           <option value="" disabled>
//             -- Choose Plan --
//           </option>
//           <option value="1min">1 Minute - $2.99</option>
//           <option value="5days">5 Days - $12.99</option>
//           <option value="10days">10 Days - $19.99</option>
//         </select>

//         <label className="block mb-2 font-medium text-gray-700">
//           Card Details
//         </label>
//         <div className="border border-gray-300 rounded-md p-3">
//           <CardElement
//             options={{
//               style: {
//                 base: {
//                   fontSize: "16px",
//                   color: "#424770",
//                   "::placeholder": {
//                     color: "#aab7c4",
//                   },
//                 },
//                 invalid: {
//                   color: "#9e2146",
//                 },
//               },
//             }}
//           />
//         </div>
//         {error && (
//           <p className="mt-2 mb-5 text-error text-center text-sm">{error}</p>
//         )}

//         <button
//           type="submit"
//           className="w-full mt-5 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-lg transition-all duration-300"
//           // disabled={!stripe || !clientSecret}
//         >
//           Pay Now
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState("");
  const [plan, setPlan] = useState("1min");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { plan }).then((res) => {
      if (res.data.clientSecret) {
        setClientSecret(res.data.clientSecret);
      } else {
        console.error("Client secret not received");
      }
    });
  }, [plan, axiosSecure]);

  const calculateSubscriptionEnd = (startTime) => {
    const date = new Date(startTime);

    switch (plan) {
      case "1min":
        date.setMinutes(date.getMinutes() + 1);
        break;
      case "5days":
        date.setDate(date.getDate() + 5);
        break;
      case "10days":
        date.setDate(date.getDate() + 10);
        break;
      default:
        break;
    }

    return date.toISOString();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log("confirm Error", confirmError);
    } else {
      console.log("payment Intent", paymentIntent);

      const subscriptionTime = new Date(
        paymentIntent.created * 1000
      ).toISOString();
      const subscriptionEnd = calculateSubscriptionEnd(
        paymentIntent.created * 1000
      );

      axiosSecure
        .patch(`/takenPremiums/${user.email}`, {
          premiumTaken: subscriptionTime,
          premiumEnds: subscriptionEnd,
        })
        .then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Subscription successfully activated!`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white text-gray-900 rounded-lg shadow-2xl p-8 mt-20">
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium text-gray-700">
          Select Plan
        </label>
        <select
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        >
          <option value="" disabled>
            -- Choose Plan --
          </option>
          <option value="1min">1 Minute - $2.99</option>
          <option value="5days">5 Days - $12.99</option>
          <option value="10days">10 Days - $19.99</option>
        </select>

        <label className="block mb-2 font-medium text-gray-700">
          Card Details
        </label>
        <div className="border border-gray-300 rounded-md p-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        {error && (
          <p className="mt-2 mb-5 text-error text-center text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full mt-5 bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 rounded-lg transition-all duration-300"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
