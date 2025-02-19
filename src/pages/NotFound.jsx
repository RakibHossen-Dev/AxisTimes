import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-2 text-center">
        <h3 className="lg:text-7xl text-5xl font-bold text-rose-600">404</h3>
        <p className="text-black dark:text-white">Not Found</p>
        <Link to="/">
          <button className="bg-rose-600 py-2 text-white rounded-sm px-5">
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
