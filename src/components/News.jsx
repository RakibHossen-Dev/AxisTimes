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
    <div className="w-11/12 mx-auto my-10">
      {newses.length > 0 && (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
          {/* বড় নিউজ ব্লক (বামদিকে) */}
          <div className="">
            <img
              src={newses[0].image}
              alt={newses[0].title}
              className="w-full h-[300px] object-cover "
            />
            <h2 className="text-xl font-bold mt-4 hover:underline">
              <Link to={`/articleDetails/${newses[0]._id}`}>
                {newses[0].title}
              </Link>
            </h2>
            <p className="text-gray-600">
              {newses[0].description.slice(0, 350)}...
            </p>
          </div>

          {/* ছোট নিউজ ব্লক (ডানদিকে) */}
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
                    <h3 className="text-md font-semibold  hover:underline">
                      <Link to={`/articleDetails/${news._id}`}>
                        {news.title}
                      </Link>
                    </h3>
                    <h3 className="text-gray-600">
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
