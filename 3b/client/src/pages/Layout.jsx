import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-200">
      <Navbar />
      <div className="flex-1 pt-16 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
