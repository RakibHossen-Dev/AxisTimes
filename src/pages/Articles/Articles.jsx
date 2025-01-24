import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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

  const handleViewCount = (id) => {
    console.log(id);
    axiosSecure.patch(`/viewCount/${id}`).then((res) => {
      refetch();
    });
  };
  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 grid-cols-1">
        {articles.map((article) => (
          <div className="relative rounded overflow-hidden shadow-lg bg-white">
            <p className="bg-rose-600 text-white py-1 px-3 absolute top-2 right-2 rounded-md text-center w-24">
              {article.viewCount} Views
            </p>
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

              <p className="text-gray-700 text-base">
                {article.description?.slice(0, 100)}...
              </p>

              <button
                onClick={() => handleViewCount(article._id)}
                className="mt-4 py-1 px-6 bg-rose-600 text-rose-100 rounded-sm"
              >
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
