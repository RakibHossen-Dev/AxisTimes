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

      <div className="max-w-md mx-auto bg-white text-gray-900 rounded-lg shadow-2xl mt-5 p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Subscribe Now</h2>

        <label className="block mb-4">
          <span className="text-lg font-semibold">
            Choose Subscription Period
          </span>
          <select className="w-full mt-2 p-3 rounded-md border-2 border-gray-300 focus:outline-none focus:border-indigo-500">
            <option value="1 Minute">1 Minute </option>
            <option value="5 Days">5 Days</option>
            <option value="10 Days">10 Days</option>
          </select>
        </label>

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all duration-300">
          <Link to="/payment">Subscribe Now</Link>
        </button>
      </div>
    </div>
  );
};

export default Subscription;
