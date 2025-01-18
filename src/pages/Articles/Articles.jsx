import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Articles = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });

  console.log(articles);
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 grid-cols-1">
        {articles.map((article) => (
          <div className=" rounded overflow-hidden shadow-lg bg-white">
            <img
              className="w-full h-48 object-cover"
              src={article.image}
              alt={article.title}
            />
            <div className="px-6 py-4">
              {/* Category Tag */}
              <div className="text-green-500 font-bold text-xs mb-2 uppercase">
                {article.category}
              </div>
              {/* Title */}
              <h2 className="font-bold text-lg mb-2 text-gray-900 hover:text-rose-500 cursor-pointer">
                {article.title}
              </h2>
              <h4 className="font-semibold text-md mb-2 text-gray-900  cursor-pointer">
                Publisher: {article.publisher}
              </h4>
              {/* Author and Meta */}
              {/* <p className="text-gray-500 text-sm mb-2">
                By {author} — {date}{" "}
                <span className="ml-2">• {comments} Comments</span>
              </p> */}
              {/* Description */}
              <p className="text-gray-700 text-base">
                {article.description?.slice(0, 100)}...
              </p>

              <button className="mt-4 py-1 px-6 bg-rose-600 text-rose-100 rounded-sm">
                <Link to={`/articleDetails/${article._id}`}>Details</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
