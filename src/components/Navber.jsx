import { RiMenu3Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axisTimes from "../assets/axistimes.png";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../hooks/useAdmin";
import { FaMoon, FaSearch } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
const Navber = () => {
  const [isAdmin] = useAdmin();
  // const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   if (theme === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [theme]);

  // const handleThemeChange = () => {
  //   setTheme(theme === "dark" ? "light" : "dark");
  // };

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const { user } = useContext(AuthContext);
  const sideMenuRef = useRef();
  const axiosPublic = useAxiosPublic();

  const { data: userType = [] } = useQuery({
    queryKey: ["userType", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userType/${user?.email}`);
      return res.data;
    },
  });
  // console.log(userType);
  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };
  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };

  const getFormattedDate = () => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
  };
  return (
    <div className="bg-rose-600">
      <nav className="pt-4 hidden lg:block">
        <div className="flex justify-between items-center w-11/12 mx-auto mb-5">
          <div className="flex gap-3 items-center">
            <div>
              <button
                onClick={handleThemeChange}
                className=" text-2xl text-white  "
              >
                {theme === "dark" ? (
                  <MdOutlineLightMode />
                ) : (
                  <MdOutlineDarkMode />
                )}
              </button>
            </div>
            <Link to="/articles">
              <div className="text-white flex items-center gap-1">
                <FaSearch className="text-white text-lg"></FaSearch>Search
              </div>
            </Link>
          </div>
          <div>
            <Link to="/">
              <img src={axisTimes} className="md:w-64 w-48" alt="" />
            </Link>
          </div>
          <div>
            <p className="text-white">{getFormattedDate()}</p>
          </div>
        </div>
        <div className=" bg-black py-4 dark:border-b dark:border-b-gray-500">
          <div className="w-11/12 mx-auto flex justify-between items-center">
            <ul className="lg:flex  items-center text-white gap-4  ">
              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/articles">All Articles</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>

              {user && (
                <>
                  <li>
                    <Link to="/AddArticle">Add Articles</Link>
                  </li>
                  <li>
                    <Link to="/subscription">Subscription</Link>
                  </li>
                  {isAdmin === true && (
                    <li>
                      <Link to="/dashboard/adminHome">Dashboard </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/myArticles">My Articles</Link>
                  </li>
                  {userType.premiumTaken !== null && (
                    <li>
                      <Link to="/premiumArticles">Premium Articles</Link>
                    </li>
                  )}
                </>
              )}
            </ul>
            <div className="flex justify-between items-center gap-3 md:gap-5">
              {user ? (
                <Link to="/myProfile">
                  {user?.photoURL && (
                    <div className="border-2 rounded-badge">
                      <img
                        className="w-12 h-12 rounded-badge object-cover"
                        src={user?.photoURL}
                        alt=""
                      />
                    </div>
                  )}
                </Link>
              ) : (
                <>
                  <button className=" lg:block hidden py-2 px-6 border  hover:bg-black  text-white border-white  transition ease-linear duration-200">
                    <Link to="/login">Login</Link>
                  </button>
                  <button className="lg:block hidden  py-2 px-8 border hover:bg-transparent bg-rose-600 hover:border-white text-white border-black  transition ease-linear duration-200">
                    <Link to="/register">Register</Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <nav className="flex justify-between items-center border-b  py-3 px-4  md:px-10 lg:hidden">
        <div>
          <Link to="/">
            <img src={axisTimes} className="md:w-60 w-48" alt="" />
          </Link>
        </div>

        <div className="flex justify-between items-center gap-3 md:gap-5">
          {user ? (
            <Link to="/myProfile">
              {user?.photoURL && (
                <div className="border-2 rounded-badge">
                  <img
                    className="w-12 h-12 rounded-badge"
                    src={user?.photoURL}
                    alt=""
                  />
                </div>
              )}
            </Link>
          ) : (
            <></>
          )}

          <div>
            <button
              onClick={handleThemeChange}
              className=" text-2xl text-white  "
            >
              {theme === "dark" ? (
                <MdOutlineLightMode />
              ) : (
                <MdOutlineDarkMode />
              )}
            </button>
          </div>
          <button onClick={openMenu} className=" text-white lg:hidden">
            <RiMenu3Line className="text-3xl" />
          </button>

          <ul
            ref={sideMenuRef}
            className="lg:hidden fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen dark:text-white dark:bg-black bg-gray-100 transition duration-500 flex py-20 px-4 flex-col  gap-5"
          >
            <div
              onClick={closeMenu}
              className="absolute right-5 top-6 cursor-pointer"
            >
              <RxCross1 className="text-black text-xl dark:text-white" />
            </div>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/articles">All Articles</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/AddArticle">Add Articles</Link>
                </li>
                <li>
                  <Link to="/subscription">Subscription</Link>
                </li>
                {isAdmin === true && (
                  <li>
                    <Link to="/dashboard/adminHome">Dashboard </Link>
                  </li>
                )}
                <li>
                  <Link to="/myArticles">My Articles</Link>
                </li>
                {userType.premiumTaken !== null && (
                  <li>
                    <Link to="/premiumArticles">Premium Articles</Link>
                  </li>
                )}
              </>
            )}
            {!user && (
              <li className="flex items-center gap-3 w-full">
                <button className="py-1 px-4 border w-full hover:bg-black hover:text-white border-black text-black dark:border-white dark:text-white transition ease-linear duration-200">
                  <Link to="/login">Login</Link>
                </button>
                <button className="py-1 px-4 border w-full hover:bg-rose-600 hover:border-rose-600  hover:text-white border-black text-black dark:border-white dark:text-white transition ease-linear duration-200">
                  <Link to="/register">Register</Link>
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navber;
