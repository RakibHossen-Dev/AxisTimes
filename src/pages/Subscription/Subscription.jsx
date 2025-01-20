import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Subscription = () => {
  const axiosSecure = useAxiosSecure();

  const { data: subscriptions = [], refetch } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subscriptions");
      return res.data;
    },
  });

  console.log(subscriptions);
  return (
    <div>
      <div className="bg-gradient-to-r from-blue-500 to-blue-300 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Subscribe Today for Unlimited Access!
        </h1>
        <p className="text-lg mb-6">
          Get premium content, exclusive insights, and daily updates directly to
          your inbox.
        </p>
        <div className="flex justify-center items-center space-x-4">
          {/* Icons */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📰</span>
            <span>Unlimited Articles</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl">🔒</span>
            <span>Secure Subscription</span>
          </div>
        </div>
        {/* Call-to-Action Button */}
        <button className="mt-6 px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-lg">
          Subscribe Now
        </button>
      </div>
      {/* <div className="flex lg:flex-row flex-col items-center justify-center gap-10 my-20">
        {subscriptions.map((subscription) => (
          <div className="w-96 p-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-4xl relative">
            <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-700 to-blue-500 text-white py-2 px-6 rounded-full text-lg font-bold shadow-lg">
              {subscription.planType}
            </div>
            <h2 className="text-4xl font-extrabold text-center  text-white mt-16">
              {subscription.duration}
            </h2>
            <p className="text-center text-xl text-gray-200 mt-4">
              {subscription.description}
            </p>
            <div className="flex justify-center mt-8">
              <span className="text-5xl font-extrabold text-white">
                ${subscription.price}
              </span>
            </div>
            <button className="w-full py-4 mt-8 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transform transition-all duration-200">
          <Link to="/payment">Subscribe Now</Link>

            </button>
          </div>
        ))}
      </div> */}
      <div className="max-w-md mx-auto bg-white text-gray-900 rounded-lg shadow-2xl mt-5 p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Subscribe Now</h2>

        {/* ড্রপডাউন */}
        <label className="block mb-4">
          <span className="text-lg font-semibold">
            Choose Subscription Period
          </span>
          <select
            // value={subscriptionPeriod}
            // onChange={(e) => setSubscriptionPeriod(e.target.value)}
            className="w-full mt-2 p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="1 Minute">1 Minute - $2.99</option>
            <option value="5 Days">5 Days - $9.99</option>
            <option value="10 Days">10 Days - $19.99</option>
          </select>
        </label>

        {/* সাবস্ক্রিপশন বোতাম */}
        <button
          // onClick={handleSubscription}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all duration-300"
        >
          <Link to="/payment">Subscribe Now</Link>
        </button>
      </div>
      {/* <div className="flex lg:flex-row flex-col items-center justify-center gap-10 my-20">
        <div className="w-96 p-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-4xl relative">
          <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-700 to-blue-500 text-white py-2 px-6 rounded-full text-lg font-bold shadow-lg">
            Basic
          </div>
          <h2 className="text-4xl font-extrabold text-center text-white mt-8">
            1 Minute
          </h2>
          <p className="text-center text-xl text-gray-200 mt-4">
            Perfect for assignment checking and testing.
          </p>
          <div className="flex justify-center mt-8">
            <span className="text-5xl font-extrabold text-white">$2.99</span>
          </div>
          <button className="w-full py-4 mt-8 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transform transition-all duration-200">
            Take Subscription
          </button>
        </div>

        <div className="w-96 p-8 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-4xl relative">
          <div className="absolute top-6 left-6 bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-6 rounded-full text-lg font-bold shadow-lg">
            Premium
          </div>
          <h2 className="text-4xl font-extrabold text-center text-white mt-8">
            5 Days
          </h2>
          <p className="text-center text-xl text-gray-100 mt-4">
            Get full access to premium content for 5 days.
          </p>
          <div className="flex justify-center mt-8">
            <span className="text-5xl font-extrabold text-white">$9.99</span>
          </div>
          <button className="w-full py-4 mt-8 bg-green-600 text-white rounded-xl hover:bg-green-700 transform transition-all duration-200">
            Take Subscription
          </button>
        </div>

        <div className="w-96 p-8 bg-gradient-to-r from-rose-500 to-rose-700 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-4xl relative">
          <div className="absolute top-6 left-6 bg-gradient-to-r from-rose-600 to-rose-500 text-white py-2 px-6 rounded-full text-lg font-bold shadow-lg">
            Premium
          </div>
          <h2 className="text-4xl font-extrabold text-center text-white mt-8">
            10 Days
          </h2>
          <p className="text-center text-xl text-gray-100 mt-4">
            Extended access to premium content for 10 days.
          </p>
          <div className="flex justify-center mt-8">
            <span className="text-5xl font-extrabold text-white">$19.99</span>
          </div>
          <button className="w-full py-4 mt-8 bg-rose-600 text-white rounded-xl hover:bg-rose-700 transform transition-all duration-200">
            Take Subscription
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Subscription;
