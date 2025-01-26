// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { Table } from "flowbite-react";
// import Swal from "sweetalert2";
// import { Pagination } from "flowbite-react";
// const AllUsers = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: users = [], refetch } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");
//       return res.data;
//     },
//   });

//   const handleMakeAdmin = (user) => {
//     // console.log(id);
//     axiosSecure.patch(`users/admin/${user._id}`).then((res) => {
//       refetch();
//       if (res.data.modifiedCount) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: `${user.name} is an Admin Now!`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     });

//     // users/admin/:id
//   };

//   console.log(users);

//   const [currentPage, setCurrentPage] = useState(1);

//   const onPageChange = (page: number) => setCurrentPage(page);
//   return (
//     <div>
//       <h2 className="my-8 font-semibold text-rose-600 text-3xl text-center">
//         All Users
//       </h2>

//       <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 image
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 user name
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 email
//               </th>

//               <th scope="col" className="px-6 py-3">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr
//                 key={user._id}
//                 className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
//               >
//                 <th
//                   scope="row"
//                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                 >
//                   <img
//                     className="w-14 h-14 rounded-md shadow-lg"
//                     src={user?.photo}
//                     alt=""
//                   />
//                 </th>
//                 <td className="px-6 py-4">{user.name}</td>
//                 <td className="px-6 py-4">{user.email}</td>
//                 <td className="px-6 py-4">
//                   {user.role === "admin" ? (
//                     <p className="text-rose-600">Admin</p>
//                   ) : (
//                     <button
//                       onClick={() => handleMakeAdmin(user)}
//                       className="bg-rose-100 py-1 px-3 text-rose-600 rounded-md"
//                     >
//                       Make Admin
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <Pagination
//           currentPage={currentPage}
//           totalPages={100}
//           onPageChange={onPageChange}
//         />
//       </div>
//     </div>
//   );
// };

// export default AllUsers;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Pagination } from "flowbite-react";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // Number of users per page

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?page=${currentPage}&pageSize=${pageSize}`
      );
      return res.data;
    },
    keepPreviousData: true, // Keep the previous page's data while new page is loading
  });
  console.log(users.users);
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`users/admin/${user._id}`).then((res) => {
      refetch();
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Assuming totalPages is passed from the API response
  const totalPages = 100; // Replace this with the actual total page count from the API

  return (
    <div>
      <h2 className="my-8 font-semibold text-rose-600 text-3xl text-center">
        All Users
      </h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                User Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.users?.map((user) => (
              <tr
                key={user._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-14 h-14 rounded-md shadow-lg"
                    src={user?.photo}
                    alt=""
                  />
                </th>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  {user.role === "admin" ? (
                    <p className="text-rose-600">Admin</p>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="bg-rose-100 py-1 px-3 text-rose-600 rounded-md"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Component */}
        <div className="text-center my-5">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages} // You can get the total pages from your API
            onPageChange={onPageChange} // Set the page to the current page
          />
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
