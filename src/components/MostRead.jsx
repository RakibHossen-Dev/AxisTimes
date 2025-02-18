import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const MostRead = () => {
  const axiosPublic = useAxiosPublic();

  const { data: mostRead = [], refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/trendingArticles");
      return res.data;
    },
  });

  return (
    <div className="my-16 w-11/12 mx-auto">
      <div className="relative w-fit ">
        <h2 className="md:text-4xl lg:text-5xl text-2xl font-extrabold text-gray-900 dark:text-white dark:border-white uppercase mb-2 border-b-4 border-black ">
          Most <span className="text-rose-600 ">Read</span>
        </h2>
        <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-red-600"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {mostRead.slice(0, 5).map((read, idx) => (
          <h1 key={read._id} className="text-2xl font-semibold">
            <Link
              to={`/articleDetails/${read._id}`}
              className="dark:text-gray-200"
            >
              <span className="text-rose-600 text-3xl">{idx + 1}. </span>
              {read.title}
            </Link>
          </h1>
        ))}
      </div>
    </div>
  );
};

export default MostRead;
