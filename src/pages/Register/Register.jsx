import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data);

    const imageFile = { image: data.image[0] };

    const res = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    createUser(data.email, data.password)
      .then((result) => {
        updateUserProfile(data.name, res.data.data.display_url).then(() => {
          const userInfo = {
            name: data.name,
            email: data.email,
            photo: res.data.data.display_url,
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            navigate("/");

            console.log(res);
          });
        });
      })
      .catch((err) => console.log(err));
    // console.log(res.data.data.display_url);

    console.log(data.name);
  };

  const { googleSignIn } = useContext(AuthContext);
  const handleGoogleRegister = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photo: result.user?.photoURL,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res);
      });

      // console.log("Register Successfull");
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form submitted");
  // };

  return (
    <div className="flex justify-center items-center py-10  bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          // className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm "
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Register
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: true,
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                validate: {
                  hasUpperCase: (value) =>
                    /[A-Z]/.test(value) || "Must contain a capital letter",
                  hasSpecialChar: (value) =>
                    /[^A-Za-z0-9]/.test(value) ||
                    "Must contain a special character",
                  hasNumber: (value) =>
                    /\d/.test(value) || "Must contain a numeric character",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium mb-2"
            >
              Upload Profile Picture
            </label>
            <input
              type="file"
              id="image"
              {...register("image", { required: true })}
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors"
          >
            Register
          </button>
        </form>

        {/* Google Register Button */}
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleGoogleRegister}
            type="button"
            className="flex items-center justify-center w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <FaGoogle className="mr-2" /> Register with Google
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?
          <Link to="/login" className="text-rose-600 hover:underline ml-1">
            Login
          </Link>
        </p>
        {/* </form>  */}
      </div>
    </div>
  );
};

export default Register;
