import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import CountUp from "react-countup";

const UserCounter = () => {
  const axiosSecure = useAxiosSecure();

  const { data: usersStats = [], refetch } = useQuery({
    queryKey: ["users-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users-stats");
      return res.data;
    },
  });

  console.log(usersStats);
  return (
    <div className="stats-page bg-gradient-to-r from-indigo-50 to-rose-50  py-12 px-6">
      {/* <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700">
        User Statistics
      </h1> */}
      <div className="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Total Users */}
        <div className="stat-card bg-white shadow-xl rounded-xl p-8 text-center border-t-4 border-blue-500 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <div className="flex justify-center mb-4">
            <span className="bg-blue-100 text-blue-500 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 11c0 1.104-.672 2-1.5 2S9 12.104 9 11s.672-2 1.5-2 1.5.896 1.5 2zm6 0c0 1.104-.672 2-1.5 2S15 12.104 15 11s.672-2 1.5-2 1.5.896 1.5 2zM6 11c0 1.104-.672 2-1.5 2S3 12.104 3 11s.672-2 1.5-2S6 9.896 6 11zm12 0v1m-2 1H8v1H7m8 4h-4v1m5-4v2m-2 4v-2m3 2h-4"
                />
              </svg>
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Total Users
          </h2>
          <p className="text-5xl font-extrabold text-gray-900">
            {/* {usersStats.allUsers} */}
            <CountUp delay={2} end={usersStats.allUsers} />
          </p>
        </div>
        {/* Normal Users */}
        <div className="stat-card bg-white shadow-xl rounded-xl p-8 text-center border-t-4 border-green-500 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <div className="flex justify-center mb-4">
            <span className="bg-green-100 text-green-500 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 8c0 1.105-.895 2-2 2s-2-.895-2-2 .895-2 2-2 2 .895 2 2zM4 12h16M4 6h16M4 18h16"
                />
              </svg>
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Normal Users
          </h2>
          <p className="text-5xl font-extrabold text-gray-900">
            {/* {usersStats.normalUsers} */}
            <CountUp delay={2} end={usersStats.normalUsers} />
          </p>
        </div>
        {/* Premium Users */}
        <div className="stat-card bg-white shadow-xl rounded-xl p-8 text-center border-t-4 border-rose-500 transition-transform transform hover:scale-105 hover:shadow-2xl">
          <div className="flex justify-center mb-4">
            <span className="bg-rose-100 text-rose-500 rounded-full p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16V7h-1m-6 4h1v3h1v-3h1M9 14h2m6 3h-2v-2h2m-2-3h-1v-2h1"
                />
              </svg>
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Premium Users
          </h2>
          <p className="text-5xl font-extrabold text-gray-900">
            {/* {usersStats.premiumUsers} */}
            <CountUp delay={5} end={usersStats.premiumUsers} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCounter;
