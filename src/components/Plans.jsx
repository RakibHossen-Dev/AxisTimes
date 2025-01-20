import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Plans = () => {
  const axiosSecure = useAxiosSecure();

  const { data: subscriptions = [], refetch } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subscriptions");
      return res.data;
    },
  });

  // console.log(subscriptions);
  return (
    <div>
      <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-pink-400 mb-8">
        Subscription Plans
      </h2>
      <div className="flex lg:flex-row flex-col items-center justify-center gap-10 mt-8 mb-20">
        {subscriptions.map((subscription) => (
          <div className="w-96 p-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-4xl relative">
            <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-700 to-blue-500 text-white py-2 px-6 rounded-full text-lg font-bold shadow-lg">
              {subscription.planType}
            </div>
            <h2 className="text-4xl font-extrabold text-center  text-white mt-16">
              {subscription.duration} Days
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
              <Link to="/subscription">Take Subscription</Link>
            </button>
          </div>
        ))}
      </div>
      {/* <div className="flex lg:flex-row flex-col items-center justify-center gap-10 my-">
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
            <Link to="/subscription">Take Subscription</Link>
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
            <Link to="/subscription">Take Subscription</Link>
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
            <Link to="/subscription">Take Subscription</Link>
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default Plans;
