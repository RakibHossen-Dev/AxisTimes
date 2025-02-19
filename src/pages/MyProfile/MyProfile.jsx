import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
  const { user, logOut, updateUserProfile } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [name, setName] = useState(user?.displayName || "");
  const [profileImage, setProfileImage] = useState(user?.photoURL || "");

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

  const handleUpdateProfile = () => {
    navigate("/update-profile");
  };

  const onSubmit = (data) => {
    // Create FormData to send file
    const formData = new FormData();
    formData.append("image", data.image[0]); // Get the first selected file

    axios
      .post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          const imageUrl = res.data.data.display_url; // Get the uploaded image URL
          console.log("Image URL:", imageUrl);
          console.log("Name:", data.name);

          // Update user profile in context
          updateUserProfile(data.name, imageUrl);

          // Update local state to trigger re-render
          setName(data.name);
          setProfileImage(imageUrl);

          axiosSecure
            .patch(`/userInfo/${user.email}`, {
              name: data.name,
              photo: imageUrl,
            })
            .then((response) => {
              console.log(response);
            });

          const modal = document.getElementById("my_modal_3");
          modal.close(); // Close the modal
        } else {
          console.error("Image upload failed:", res.data.error.message);
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center  overflow-hidden z-0">
      <div
        className="absolute inset-0 bg-cover bg-center transform scale-110"
        style={{
          backgroundImage: `url("https://source.unsplash.com/1600x900/?luxury,abstract")`,
        }}
      ></div>
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div> */}

      <div className="w-11/12 md:w-full mx-auto relative z-10 bg-white/10 backdrop-blur-lg border border-gray-200/30 shadow-2xl rounded-3xl p-10 max-w-md text-center transform hover:scale-105 transition-transform duration-500 ease-out">
        {user && (
          <>
            <div className="relative mx-auto w-32 h-32">
              <img
                src={profileImage || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover border-4 border-purple-500 shadow-lg"
              />
              <span className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <h2 className="mt-4 text-4xl font-extrabold dark:text-white">
              {name || "Your Name"}
            </h2>
          </>
        )}
        <p className=" dark:text-gray-300 text-sm italic">
          {user?.email || "Your Email"}
        </p>
        <p
          className={`mt-2 px-4 py-1 inline-block rounded-full text-sm font-semibold ${
            isAdmin
              ? "text-yellow-600 bg-yellow-700/30"
              : "text-blue-300 bg-blue-700/30"
          }`}
        >
          Role: {isAdmin ? "Admin" : "User"}
        </p>

        <div className="mt-6 space-y-4">
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:from-indigo-500 hover:to-blue-500 transform transition-transform duration-300 ease-out"
          >
            Update Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 px-6 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-red-500 transform transition-transform duration-300 ease-out"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box rounded-sm">
          {/* Close button */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Form Content */}
          <h3 className="font-bold text-lg mb-4">Update Profile</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name", { required: true })}
                className="input input-bordered w-full rounded-sm"
                defaultValue={name} // Set default value
              />
            </div>

            {/* Image Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-medium">Profile Image</span>
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
                className="file-input file-input-bordered rounded-sm w-full"
              />
            </div>

            {/* Submit Button */}
            <div className="form-control">
              <button
                type="submit"
                className="py-3 bg-rose-600 text-white rounded-sm w-full mt-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyProfile;
