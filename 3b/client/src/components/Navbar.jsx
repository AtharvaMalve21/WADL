import { useContext, useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Menu, X, ChevronDown } from "lucide-react"; // Icons

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const URI = import.meta.env.VITE_BACKEND_URI;
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const { data } = await axios.get(URI + "/api/auth/logout", {
        withCredentials: true,
      });
      if (data.success) {
        setUser(null);
        setIsLoggedIn(false);
        toast.success(data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          Blogify
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li>
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/users/blogs" className="hover:text-blue-400 transition">
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-400 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* Auth Links / Profile Dropdown */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/blogs/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                + Add Blog
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 hover:text-blue-400 transition"
                >
                  <img
                    src={
                      user?.profilePic
                        ? `${URI}/${user.profilePic}`
                        : "/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border border-gray-900 hover:scale-110"
                  />
                  <span>{user?.name}</span>
                  <ChevronDown size={18} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-gray-300 shadow-lg rounded-md py-2">
                    <Link
                      to="/users/profile"
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={logoutUser}
                      className="w-full text-left px-4 py-2 text-red-300 hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/signup"
                className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 p-4 space-y-3">
          <Link to="/" className="block text-gray-300 hover:text-blue-400">
            Home
          </Link>
          <Link
            to="/users/blogs"
            className="block text-gray-300 hover:text-blue-400"
          >
            Blogs
          </Link>
          <Link to="/about" className="block text-gray-300 hover:text-blue-400">
            About
          </Link>
          <Link
            to="/contact"
            className="block text-gray-300 hover:text-blue-400"
          >
            Contact
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/blogs/new"
                className="block bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
              >
                + Add Blog
              </Link>
              <Link
                to="/users/profile"
                className="block text-gray-300 font-medium"
              >
                Profile
              </Link>
              <button
                onClick={logoutUser}
                className="block w-full bg-red-600 text-white text-center py-2 rounded-md hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div>
              <Link
                to="/signup"
                className="block bg-green-600 text-white text-center py-2 rounded-md hover:bg-green-700 transition"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="block bg-blue-600 text-white text-center py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
