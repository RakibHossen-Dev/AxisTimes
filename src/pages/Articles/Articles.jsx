import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const Articles = () => {
  const { user } = useContext(AuthContext);
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [search, setSearch] = useState("");
  console.log(search);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const { data: userType = [] } = useQuery({
    queryKey: ["userType", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userType/${user?.email}`);
      console.log(res);
      return res.data;
    },
  });
  console.log(userType);

  console.log(selectedTag);
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["articles", search, selectedPublisher, selectedTag],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/allArticles?search=${search}&publisher=${selectedPublisher}&tag=${selectedTag}`
      );
      return res.data;
    },
    enabled:
      search.length > 0 ||
      selectedPublisher.length > 0 ||
      (Array.isArray(selectedTag) && selectedTag.length > 0) ||
      !search,

    refetchOnWindowFocus: false,
  });

  // Tag filter handler
  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
    refetch();
  };

  // console.log(articles);
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosPublic.get("/publishers");
      return res.data;
    },
  });

  const handleViewCount = (id) => {
    // console.log(id);
    axiosSecure.patch(`/viewCount/${id}`).then((res) => {
      refetch();
    });
  };

  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="grid grid-cols-3 gap-5 items-center justify-between md:mb-12 mb-5">
        <div>
          {/* Publisher dropdown */}
          <select
            className="select select-bordered w-full"
            value={selectedPublisher}
            onChange={(e) => setSelectedPublisher(e.target.value)}
          >
            {publishers.map((publisher, index) => (
              <option key={index} value={publisher.name}>
                {publisher.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          {/* Tags dropdown */}
          <select
            className="select select-bordered w-full"
            value={selectedTag}
            onChange={handleTagChange} // নতুন হ্যান্ডলার ব্যবহার করা হলো
          >
            <option value="" disabled>
              Filtered by tags
            </option>
            <option value="programming">Programming</option>
            <option value="business">Business</option>
            <option value="politics">Politics</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="education">Education</option>
            <option value="world-news">World-News</option>
            <option value="environment">Environment</option>
            <option value="climate">Climate</option>
          </select>
        </div>

        <div>
          {/* Search input */}
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow border-none focus:border-none"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>

        {/* Display selected values */}
        {/* <div>
          <p>Selected Publisher: {selectedPublisher}</p>
          <p>Selected Tag: {selectedTag}</p>
          <p>Search Query: {searchQuery}</p>
        </div> */}
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 grid-cols-1">
        {articles
          .filter((article) => article.status === "approve")
          .map((article) => (
            <div
              className={`relative rounded overflow-hidden shadow-lg  ${
                article.isPremium === "no" ? "bg-white" : " bg-rose-100"
              } `}
            >
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

                {article.isPremium === "yes" &&
                userType.premiumTaken === null ? (
                  <button
                    onClick={() => handleViewCount(article._id)}
                    className="mt-4 py-1 px-6 cursor-not-allowed  bg-rose-400  text-rose-100 rounded-sm"
                  >
                    Details
                  </button>
                ) : (
                  <Link to={`/articleDetails/${article._id}`}>
                    <button
                      onClick={() => handleViewCount(article._id)}
                      className="mt-4 py-1 px-6 bg-rose-600 text-rose-100 rounded-sm"
                    >
                      Details
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Articles;
