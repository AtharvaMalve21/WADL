import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const { items } = useContext(ProductContext);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [dropDownMenu, setDropDownMenu] = useState(false);

  const { setIsLoggedIn } = useContext(UserContext);

  const toggleDropDownMenu = () => {
    setDropDownMenu((prev) => !prev);
  };

  const navigate = useNavigate();

  const logoutUser = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    toast.success("User is successfully logged out!");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-white hover:scale-105 transition-transform"
        >
          Ecomzy
        </Link>

        {/* Right Section */}
        <div className="flex items-center space-x-6 text-white relative">
          {loggedInUser ? (
            <>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-md border transition-all duration-300 ${
                  dropDownMenu ? "bg-white/10 border-white" : "border-white/30"
                }`}
              >
                {/* User Icon + Name */}
                <div className="flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0115 0A17.933 17.933 0 0112 21.75c-2.68 0-5.22-.584-7.5-1.632z"
                    />
                  </svg>
                  <span className="font-medium">{loggedInUser.name}</span>
                </div>

                {/* Dropdown Toggle */}
                <button onClick={toggleDropDownMenu}>
                  <svg
                    className={`w-5 h-5 transition-transform duration-300 ${
                      dropDownMenu ? "rotate-180 text-white" : "text-white/80"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>

                {/* Cart */}
                <Link to="/cart" className="relative ml-2">
                  <svg
                    className="w-7 h-7 text-white hover:text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386a1.125 1.125 0 011.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138A60.114 60.114 0 0012.15 3.3M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                  {items > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                      {items}
                    </span>
                  )}
                </Link>
              </div>

              {/* Dropdown Menu */}
              {dropDownMenu && (
                <div className="absolute right-0 top-16 bg-white text-black shadow-lg rounded-md w-48 py-2 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={logoutUser}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="hover:underline text-white hover:text-gray-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:underline text-white hover:text-gray-200"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
