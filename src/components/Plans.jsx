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
    <div className="w-11/12 mx-auto my-10">
      <div className="relative w-fit ">
        <h2 className="md:text-4xl lg:text-5xl text-2xl font-extrabold text-gray-900 uppercase mb-2 border-b-4 border-black ">
          Subscription <span className="text-rose-600 ">Plans</span>
        </h2>
        <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-red-600"></div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 items-center justify-center gap-10 mb-10">
        <div className=" p-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-4xl relative">
          <div className="absolute top-6 left-6 bg-gradient-to-r from-blue-700 to-blue-500 text-white py-2 px-6 rounded-full text-lg font-bold shadow-lg">
            Basic
          </div>
          <h2 className="text-4xl font-extrabold text-center text-white mt-14">
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

        <div className="p-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-4xl relative">
          <div className="absolute top-6 left-6 bg-gradient-to-r from-green-600 to-green-500 text-white py-2 px-6 rounded-full text-lg font-bold shadow-lg">
            Premium
          </div>
          <h2 className="text-4xl font-extrabold text-center text-white mt-14">
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

        <div className=" p-8 bg-gradient-to-r from-rose-500 to-rose-700 rounded-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-4xl relative">
          <div className="absolute top-6 left-6 bg-gradient-to-r from-rose-600 to-rose-500 text-white py-2 px-6 rounded-full text-lg font-bold shadow-lg">
            Premium
          </div>
          <h2 className="text-4xl font-extrabold text-center text-white mt-14">
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
      </div>
    </div>
  );
};

export default Plans;
