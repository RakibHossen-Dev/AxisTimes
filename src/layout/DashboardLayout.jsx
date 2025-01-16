import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex min-h-screen ">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-gray-50 text-gray-800 transition-transform ease-in-out duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 rounded-tr-lg rounded-br-lg`}
        aria-label="Sidebar"
      >
        <div className="h-full px-6 py-8 overflow-y-auto relative">
          {/* Close Button */}
          <button
            onClick={closeSidebar}
            className="absolute top-4 right-4 text-black hover:text-red-500 sm:hidden"
            aria-label="Close Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="text-2xl text-rose-600 font-semibold mb-8">
            Dashboard
          </h2>
          <ul className="space-y-6">
            <li>
              <Link
                to="/dashboard/adminHome"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:text-white hover:bg-rose-600 transition-colors ease-in-out duration-200"
              >
                {/* Home Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10l9-7 9 7v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10z"
                  />
                </svg>
                <span>Admin Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/allUsers"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:text-white hover:bg-rose-600 transition-colors ease-in-out duration-200"
              >
                {/* Users Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5V10l-7-5-7 5v10h5m-6 4h12M12 10v10"
                  />
                </svg>
                <span>All Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/allArticles"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:text-white hover:bg-rose-600 transition-colors ease-in-out duration-200"
              >
                {/* Articles Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"
                  />
                </svg>
                <span>All Articles</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/addPublisher"
                className="flex items-center p-2 text-gray-800 rounded-lg hover:text-white hover:bg-rose-600 transition-colors ease-in-out duration-200"
              >
                {/* Publisher Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16l4-4m0 0l4-4m-4 4v6"
                  />
                </svg>
                <span>Add Publisher</span>
              </Link>
            </li>
          </ul>

          {/* <ul className="space-y-6">
            <li>
              <Link
                to="/dashboard/adminHome"
                className="flex items-center p-2 text-gray-800 rounded-lg  hover:text-white  hover:bg-rose-600 transition-colors ease-in-out duration-200"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 7v10m5-5H7"
                  />
                </svg>
                <span>Admin Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/allUsers"
                className="flex items-center p-2 text-gray-800 rounded-lg  hover:text-white hover:bg-rose-600 transition-colors ease-in-out duration-200"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12h18m-9 9V3"
                  />
                </svg>
                <span>All Users</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/allArticles"
                className="flex items-center p-2 text-gray-800 rounded-lg  hover:text-white hover:bg-rose-600 transition-colors ease-in-out duration-200"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12h18m-9 9V3"
                  />
                </svg>
                <span>All Articles </span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/addPublisher"
                className="flex items-center p-2 text-gray-800 rounded-lg  hover:text-white hover:bg-rose-600 transition-colors ease-in-out duration-200"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12h18m-9 9V3"
                  />
                </svg>
                <span>Add Publisher</span>
              </Link>
            </li>
          </ul> */}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 ml-0 sm:ml-64 bg-white">
        {/* Mobile Sidebar Toggle */}
        <header className="flex items-center justify-between bg-white p-4 sm:hidden border-b">
          <button
            onClick={toggleSidebar}
            className=" border p-2 rounded-badge border-rose-600 text-rose-600 transition-colors ease-in-out duration-300"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h2 className="text-2xl text-rose-600 font-semibold ">Dashboard</h2>
        </header>

        {/* Content */}
        <main className="p-8 sm:p-12">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
