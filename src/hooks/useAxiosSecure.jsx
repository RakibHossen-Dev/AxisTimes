import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://axistimes-server.vercel.app",
});

axiosSecure.interceptors.request.use(function (config) {
  const token = localStorage.getItem("access-token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});

axiosSecure.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const status = error.response?.status; //
    if (status === 401 || status === 403) {
      const { logOut } = useContext(AuthContext);
      const navigate = useNavigate(); // Navigation
      await logOut();
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
