import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Select from "react-select";
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
];
const AddArticle = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Article submitted successfully!");
  };
  return (
    <div className="flex justify-center items-center py-10 md:px-0 px-3   bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
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
            <input
              type="text"
              id="publisher"
              {...register("publisher", {
                required: "Publisher name is required",
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter publisher name"
            />
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
            {/* <input
              type="text"
              id="tags"
              {...register("tags", { required: "Tags are required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter tags (comma separated)"
            />

            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
            )} */}
            <Select
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
