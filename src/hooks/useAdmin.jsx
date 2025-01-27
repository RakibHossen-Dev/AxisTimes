import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
// import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  // const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  // const email = localStorage.getItem("email");
  console.log(user);
  const { data: isAdmin, isLoading: isAminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/admin/${user?.email}`
        // `/users/admin/${user?.email ? user.email : email}`
      );
      // enabled: !user.email;
      // console.log(res.data);
      return res.data?.admin;
    },
  });
  return [isAdmin, isAminLoading];
};

export default useAdmin;
