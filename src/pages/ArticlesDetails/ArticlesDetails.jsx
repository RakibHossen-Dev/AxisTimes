import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ArticlesDetails = () => {
  const { id } = useParams();
  console.log(id);
  const axiosSecure = useAxiosSecure();
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["articles", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/article/${id}`);
      return res.data;
    },
  });

  console.log(articles);

  return (
    <>
      <div className="py-10 ">
        <div className="md:w-1/2 mx-auto  p-6 ">
          {/* Article Image */}
          <div className="mb-6">
            <img
              className="w-full h-80 object-cover "
              src={articles.image}
              alt={articles.title}
            />
          </div>

          {/* Article Title */}
          <h1 className="text-4xl font-bold dark:text-white text-gray-900 mb-4 leading-tight">
            {articles.title}
          </h1>

          {/* Publisher & Email */}
          <div className="mb-6">
            <p className="text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                Published by:
              </span>{" "}
              {articles.publisher}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-200">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                Contact:
              </span>{" "}
              {articles.email}
            </p>
          </div>

          {/* Tags */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2 dark:text-gray-200">
              Tags:
            </h3>
            <div className="flex flex-wrap gap-3">
              {articles?.tag?.map((t, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold dark:text-gray-300 text-gray-800 mb-3">
              Description:
            </h3>
            <p className="text-gray-700 leading-7 dark:text-gray-400">
              {articles.description}
            </p>
          </div>

          {/* Action Section */}
          <div className="flex justify-between items-center border-t pt-4">
            <div>
              <p
                className={`text-lg font-medium ${
                  articles.status === "approve"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {articles.viewCount} Views
                {/* Status:{" "}
              {articles?.status?.charAt(0)?.toUpperCase() +
                articles?.status?.slice(1)} */}
              </p>
            </div>
            <div>
              {articles.isPremium === "yes" ? (
                <span className="text-yellow-600 font-semibold">
                  Premium Content
                </span>
              ) : (
                <span className="text-gray-600 font-medium">Free Content</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesDetails;
