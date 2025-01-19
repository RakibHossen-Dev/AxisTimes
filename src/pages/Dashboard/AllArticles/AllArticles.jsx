import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AllArticles = () => {
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });

  // handleMakepremium
  const handleMakepremium = (premium, id) => {
    console.log(id);
    axiosSecure
      .patch(`/ispremium/${id}`, {
        isPremium: premium,
      })
      .then((res) => {
        refetch();
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `This Article Premium Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const handleMakeApprove = (approve, id) => {
    // const handleMakeApprove = (approve, id) => {
    console.log(approve, id);

    axiosSecure
      .patch(`/articles/${id}`, {
        status: approve,
      })
      .then((res) => {
        refetch();
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Status update Admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // declineReasons
  const handleMakeDecline = (decline, id) => {
    console.log(id);
    setSelectedArticleId(id);
    axiosSecure
      .patch(`/articles/${id}`, {
        status: decline,
      })
      .then((res) => {
        refetch();
        // if (res.data.modifiedCount) {
        //   Swal.fire({
        //     position: "top-end",
        //     icon: "success",
        //     title: `Status update Admin Now!`,
        //     showConfirmButton: false,
        //     timer: 1500,
        //   });
        // }
      });
  };

  const onSubmit = async (data) => {
    if (data.declineReason.trim()) {
      // API Call
      axiosSecure
        .post("/declineReasons", {
          reason: data.declineReason,
          declineId: selectedArticleId,
        })
        .then((response) => {
          // Success Message
          if (response.data.insertedId) {
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "DeclineReason posted",
              showConfirmButton: false,
              timer: 1500,
            });
            document.getElementById("custom_modal").close();
          }
        });
    }
  };

  const handleDelete = async (id) => {
    console.log("Deleted", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure
          .delete(`/articles/${id}`)
          .then((result) => {
            refetch();

            // console.log(result.data);
            if (result.data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "Articale has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div>
      <h2 className="my-8 font-semibold text-rose-600 text-3xl text-center">
        All Articles
      </h2>

      <div className="relative overflow-x-auto w-full max-w-screen-xl mx-auto shadow-md sm:rounded-lg">
        <table className="bg-gray-50 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="  text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-4">
                Details
              </th>
              <th scope="col" className="px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr
                key={article._id}
                className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-900 border-b dark:border-gray-700"
              >
                {/* Details Column */}
                <td className="px-6 py-4">
                  <div className="flex md:flex-row flex-col items-center space-x-4">
                    {/* Image */}
                    <img
                      src={article?.image}
                      alt="Article"
                      className="w-16 h-16 md:w-24 md:h-24 rounded-lg shadow-md"
                    />
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        {article.title}
                      </h3>
                      <p className="text-md font-medium text-gray-800 dark:text-white">
                        Author: {article.name}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <span className="font-medium">Publisher:</span>{" "}
                        {article.publisher}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 hidden lg:block">
                        <span className="font-medium">Email:</span>{" "}
                        {article.email}
                      </p>
                      {/* <span
                        className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                          article.status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                        {article.status}
                      </span> */}
                    </div>
                  </div>
                </td>

                {/* Actions Column */}
                <td className="px-6 py-4">
                  <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
                    <button
                      onClick={() => handleMakeApprove("approve", article._id)}
                      className="bg-green-100 text-green-600 py-2 px-3 rounded-md"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleMakepremium("yes", article._id)}
                      className="bg-purple-100 text-purple-600 py-2 px-3 rounded-md"
                    >
                      Make Premium
                    </button>
                    <button className="bg-blue-100 cursor-text text-blue-600 py-2 px-3 rounded-md">
                      {article.status}
                      {/* <span
                        className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${
                          article.status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : "bg-rose-100 text-rose-600"
                        }`}
                      >
                      </span> */}
                    </button>
                    <button
                      onClick={() => {
                        handleMakeDecline("decline", article._id);
                        document.getElementById("custom_modal").showModal();
                      }}
                      className="bg-rose-100 text-rose-600 py-2 px-3 rounded-md"
                    >
                      Decline
                    </button>

                    <button
                      onClick={() => handleDelete(article._id)}
                      className="bg-red-100 text-red-600 py-2 px-3 rounded-md"
                    >
                      <MdOutlineDeleteOutline className="inline-block text-xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="custom_modal" className="modal">
        <div className="modal-box relative">
          {/* Close Button */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("custom_modal").close()}
          >
            ✕
          </button>

          {/* Modal Header */}
          <h3 className="font-bold text-xl text-gray-800 mb-4">
            Decline Reason
          </h3>

          {/* Modal Content */}
          <p className="text-gray-600 mb-4">
            Please provide a reason for declining this action:
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <textarea
              id="decline-reason"
              rows="4"
              {...register("declineReason", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-gray-800"
              placeholder="Write your reason here..."
            ></textarea>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end gap-4">
              {/* Cancel Button */}
              <button
                type="button"
                className="btn btn-outline rounded-lg px-4 py-2 text-gray-700 border-gray-300"
                onClick={() => document.getElementById("custom_modal").close()}
              >
                Cancel
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn bg-rose-600 text-white rounded-lg px-6 py-2 hover:bg-rose-700"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* kjkgjfhkjfg */}
    </div>
  );
};

export default AllArticles;
