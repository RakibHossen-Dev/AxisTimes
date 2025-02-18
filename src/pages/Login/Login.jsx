import { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserLogin = () => {
    setEmail("rakib@gmail.com");
    setPassword("Ra123#");
  };
  const handleAdminLogin = () => {
    setEmail("hellorakibhossen@gmail.com");
    setPassword("Ra123#");
  };

  const handleGoogleLogin = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        photo: result.user?.photoURL,
        premiumTaken: null,
        premiumEnds: null,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res);
      });

      // console.log("Register Successfull");
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
    console.log(email, password);
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={handleUserLogin}
              className="w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-black transition-colors"
            >
              User Login
            </button>
            <button
              onClick={handleAdminLogin}
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors"
            >
              Admin Login
            </button>
          </div>

          <form onSubmit={(e) => handleLogin(e)}>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
              Login
            </h2>
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
                name="email"
                value={email}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
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
                name="password"
                value={password}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-2 px-4 rounded-lg hover:bg-rose-700 transition-colors"
            >
              Login
            </button>

            {/* Google Login Button */}
            <div className="flex items-center justify-center mt-4">
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="flex items-center justify-center w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors"
              >
                <FaGoogle className="mr-2" /> Sign in with Google
              </button>
            </div>

            <p className="text-sm text-center text-gray-500 mt-4">
              Don't have an account?
              <Link
                to="/register"
                className="text-rose-600 hover:underline ml-1"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
