import { RiMenu3Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";

import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import axisTimes from "../assets/axistimes.png";
import { AuthContext } from "../providers/AuthProvider";
const Navber = () => {
  const { user } = useContext(AuthContext);
  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = "translateX(-16rem)";
  };
  const closeMenu = () => {
    sideMenuRef.current.style.transform = "translateX(16rem)";
  };
  return (
    <div className="bg-rose-600">
      <nav className="flex justify-between items-center border-b  py-3 px-5  md:px-10">
        <div>
          <Link to="/">
            <img src={axisTimes} className="w-60" alt="" />
          </Link>
        </div>
        <div>
          <ul className="lg:flex items-center text-white gap-4 hidden">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/AddArticle">Add Articles</Link>
            </li>
            <li>
              <Link to="/articles">All Articles</Link>
            </li>
            <li>
              <Link to="/product">Subscription</Link>
            </li>
            <li>
              <Link to="/dashboard/adminHome">Dashboard </Link>
            </li>
            <li>
              <Link to="/myArticles">My Articles</Link>
            </li>
          </ul>
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
            <>
              <button className=" lg:block hidden py-2 px-6 border  hover:bg-black hover:border-black text-white border-white  transition ease-linear duration-200">
                <Link to="/login">Login</Link>
              </button>
              <button className="lg:block hidden  py-2 px-8 border hover:bg-transparent bg-black hover:border-white text-white border-black  transition ease-linear duration-200">
                <Link to="/register">Register</Link>
              </button>
            </>
          )}

          <button onClick={openMenu} className=" text-white lg:hidden">
            <RiMenu3Line className="text-3xl" />
          </button>

          <ul
            ref={sideMenuRef}
            className="lg:hidden fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-gray-100 transition duration-500 flex py-20 px-4 flex-col  gap-5"
          >
            <div
              onClick={closeMenu}
              className="absolute right-5 top-6 cursor-pointer"
            >
              <RxCross1 className="text-black text-xl" />
            </div>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/AddArticle">Add Articles</Link>
            </li>
            <li>
              <Link to="/articles">All Articles</Link>
            </li>

            <li>
              <Link to="/product">Subscription</Link>
            </li>
            <li>
              <Link to="/contact">Dashboard </Link>
            </li>
            <li>
              <Link to="/myArticles">My Articles</Link>
            </li>
            <li className="flex items-center gap-3 w-full">
              <button className="py-1 px-4 border w-full hover:bg-black hover:text-white border-black text-black transition ease-linear duration-200">
                <Link to="/login">Login</Link>
              </button>
              <button className="py-1 px-4 border w-full hover:bg-rose-600 hover:border-rose-600  hover:text-white border-black text-black transition ease-linear duration-200">
                <Link to="/register">Register</Link>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navber;
