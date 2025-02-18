import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const News = () => {
  const axiosPublic = useAxiosPublic();
  const { data: newses = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/allArticles");
      return res.data;
    },
  });
  console.log(newses);

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="relative w-fit mb-8">
        <h2 className="md:text-4xl lg:text-5xl text-2xl font-extrabold  dark:text-white text-gray-900 uppercase mb-2 border-b-4 border-black dark:border-white">
          Letest <span className="text-rose-600 ">Articles</span>
        </h2>
        <div className="absolute bottom-0 left-0 w-1/2 h-1 bg-red-600"></div>
      </div>
      {newses.length > 0 && (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          <div className="">
            <img
              src={newses[0].image}
              alt={newses[0].title}
              className="w-full h-[300px] object-cover "
            />
            <h2 className="text-xl font-bold mt-4 hover:underline dark:text-white">
              <Link to={`/articleDetails/${newses[0]._id}`}>
                {newses[0].title}
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {newses[0].description.slice(0, 350)}...
            </p>
          </div>

          <div className="">
            <div className="grid grid-cols-2 gap-4">
              {newses.slice(1, 5).map((news) => (
                <div key={news._id} className="flex flex-col gap-6 w-full ">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-32 object-cover "
                  />
                  <div>
                    <h3 className="text-md font-semibold dark:text-white  hover:underline">
                      <Link to={`/articleDetails/${news._id}`}>
                        {news.title}
                      </Link>
                    </h3>
                    <h3 className="text-gray-600 dark:text-gray-400">
                      {news.description.slice(0, 50)}...
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
