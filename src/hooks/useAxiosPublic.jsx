import axios from "axios";
const axiosPublic = axios.create({
  baseURL: "https://axistimes-server.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
