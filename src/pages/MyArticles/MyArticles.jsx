import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
const MyArticles = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: articles = [], refetch } = useQuery({
    queryKey: ["articles", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${user.email}`);
      return res.data;
    },
  });

  console.log(articles);

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
    <div className="w-11/12 mx-auto">
      <h2 className="my-8 font-semibold text-rose-600 text-3xl text-center">
        My Articles
      </h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                isPremium
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>

              <th scope="col" className="px-6 py-3">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, idx) => (
              <tr
                key={article._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {idx + 1}
                  {/* <img
                    className="w-14 h-14 rounded-md shadow-lg"
                    src={article?.image}
                    alt=""
                  /> */}
                </th>
                <td className="px-6 py-4">{article.title}</td>
                <td className="px-6 py-4">
                  <button className="bg-rose-100 py-1 px-3 text-rose-600 rounded-md">
                    {article.status}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button className="bg-blue-100 py-1 px-3 text-blue-600 rounded-md">
                    {article.isPremium}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button className="bg-green-100 py-1 px-3 text-green-600 rounded-md">
                    <FiEdit className="text-xl " />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="bg-red-100 py-1 px-3 text-red-600 rounded-md"
                  >
                    <MdOutlineDeleteOutline className="text-xl" />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button className="bg-rose-100 py-1 px-3 text-rose-600 rounded-md">
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyArticles;
