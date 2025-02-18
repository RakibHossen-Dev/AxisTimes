import { useForm } from "react-hook-form";
import React, { useContext, useState } from "react";
import Select from "react-select";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
const options = [
  { value: "programming", label: "programming" },
  { value: "Business", label: "Business" },
  { value: "Politics", label: "Politics" },
  { value: "Health", label: "Health" },
  { value: "Science", label: "Science" },
  { value: "Sports", label: "Sports" },
  { value: "Entertailnment", label: "Entertailnment" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Education", label: "Education" },
  { value: "World-News", label: "World-News" },
  { value: "Environment", label: "Environment" },
  { value: "Climate", label: "Climate" },
];

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddArticle = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: publishers = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });
  const postedDate = new Date().toISOString().split("T")[0];
  // console.log(postedDate);
  const [selectedOption, setSelectedOption] = useState(null);
  // console.log(selectedOption);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };

    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const selectedPublisher = publishers.find(
        (publisher) => publisher.name === data.publisher
      );

      const tagsArray = selectedOption?.map((option) => option.value);
      const articles = {
        title: data.title,
        image: res.data.data.display_url,
        publisher: data.publisher,
        publisherId: selectedPublisher?._id,
        tag: tagsArray,
        description: data.description,
        email: user?.email,
        name: user?.displayName,
        photo: user?.photoURL,
        postedDate: postedDate,
        status: "pending",
        isPremium: "no",
        viewCount: 0,
      };

      axiosSecure
        .post("/articles", { article: articles, email: user.email })
        .then((response) => {
          const PublisherRes = response.data;
          console.log(PublisherRes);
          if (PublisherRes.result?.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Success!",
              text: "Your article has been published successfully.",
              confirmButtonText: "OK",
            });
          } else if (PublisherRes.error) {
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: "Failed to Add Article",
              text: PublisherRes.error,
              showConfirmButton: true,
            });
          } else {
            Swal.fire({
              position: "top-center",
              icon: "warning",
              title: "Something went wrong!",
              text: "Unable to add article. Please try again later.",
              showConfirmButton: true,
            });
          }
        })
        .finally(() => {
          console.log("Request completed.");
        });
    }
    // H--------------------------------------------
  };

  return (
    <div className="flex justify-center items-center py-10 md:px-0 px-3 dark:bg-black  bg-gray-100">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Add Article
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter article title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Image */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              {...register("image", { required: "Image is required" })}
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          {/* Publisher */}
          <div className="mb-4">
            <label
              htmlFor="publisher"
              className="block text-gray-700 font-medium mb-2"
            >
              Publisher
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="publisher"
              id=""
              {...register("publisher", {
                required: "Publisher name is required",
              })}
            >
              {publishers.map((publisher) => (
                <option key={publisher._id} value={publisher.name}>
                  {publisher.name}
                </option>
              ))}
            </select>

            {errors.publisher && (
              <p className="text-red-500 text-sm mt-1">
                {errors.publisher.message}
              </p>
            )}
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label
              htmlFor="tags"
              className="block text-gray-700 font-medium mb-2"
            >
              Tags
            </label>

            <Select
              name="tag"
              isMulti
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
              placeholder="Write a short description"
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors"
          >
            Submit Article
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
