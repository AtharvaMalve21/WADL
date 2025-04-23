import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setIsLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const URI = import.meta.env.VITE_BACKEND_URI;

  const loginUser = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post(
        URI + "/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(data);
      if (data.success) {
        setIsLoggedIn(true);
        toast.success(data.message);
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-90px)] bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
          Welcome Back
        </h1>

        <form onSubmit={loginUser} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-600 dark:text-gray-300 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <EnvelopeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder="Enter Email"
                id="email"
                className="w-full p-3 pl-10 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-600 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <LockClosedIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-3" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                placeholder="Enter Password"
                id="password"
                className="w-full p-3 pl-10 pr-10 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
              />
              <span
                onClick={toggleShowPassword}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 cursor-pointer"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Log in
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            Don't have an account ?{" "}
            <Link to="/signup" className="text-red-400 hover:underline">
              Signup now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
