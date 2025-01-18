// import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthProvider";

// const myProfile = () => {
//   const { user, logOut } = useContext(AuthContext);

//   const handleLogout = () => {
//     logOut()
//       .then(() => {
//         console.log("Logged out successfully");
//       })
//       .catch((error) => {
//         console.error("Error logging out:", error);
//       });
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
//         {/* Profile Image */}
//         <div className="flex justify-center mb-4">
//           <img
//             src={user?.photoURL || "https://via.placeholder.com/150"}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
//           />
//         </div>

//         {/* User Details */}
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             {user?.displayName || "Your Name"}
//           </h2>
//           <p className="text-gray-600 mb-4">{user?.email || "Your Email"}</p>
//           <p className="text-sm text-gray-500">{user?.role || "Role: User"}</p>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="mt-6 w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default myProfile;

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

const MyProfile = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

  console.log(isAdmin);
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut()
      .then(() => {
        console.log("Logged out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="flex justify-center items-center px-3 h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-rose-500">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full transform hover:scale-105 transition-transform duration-300">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <span className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></span>
          </div>
        </div>

        {/* User Details */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {user?.displayName || "Your Name"}
          </h2>
          <p className="text-gray-600 text-sm mb-4 italic">
            {user?.email || "Your Email"}
          </p>
          {isAdmin ? (
            <p className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full inline-block">
              {/* {user?.role || "Role: User"} */}
              Role: Admin
            </p>
          ) : (
            <p className="text-sm font-semibold text-purple-700 bg-purple-100 px-3 py-1 rounded-full inline-block">
              {/* {user?.role || "Role: User"} */}
              Role: User
            </p>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-gradient-to-r from-rose-500 to-red-500 text-white py-3 px-4 rounded-lg hover:shadow-xl hover:from-red-500 hover:to-rose-500 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
