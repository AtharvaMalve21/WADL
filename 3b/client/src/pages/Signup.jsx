import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-90px)] bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-6">
          Create An Account
        </h1>

        <form className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-600 dark:text-gray-300 mb-1"
            >
              Name
            </label>
            <div className="relative">
              <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                placeholder="Enter Full Name"
                id="name"
                className="w-full p-3 pl-10 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring focus:ring-blue-300 dark:focus:ring-blue-600"
              />
            </div>
          </div>

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
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-400 text-sm">
            Already have an account ?{" "}
            <Link to="/login" className="text-red-400 hover:underline">
              Login now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
