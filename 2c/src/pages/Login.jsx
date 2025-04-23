import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userData } from "../../data";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLoggedIn, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const loginUser = (ev) => {
    ev.preventDefault();

    //check if the user exists
    const user = userData.find((p) => p?.email == email);

    if (!user) {
      toast.error("User is not registered with this mail id.");
    }

    console.log(user);

    //validate password
    if (user?.password !== password) {
      toast.error("Password does not match. Please try again.");
    }

    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
    toast.success(`Welcome back ${user.name}`);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 sm:p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          👋 Welcome Back
        </h1>

        <form onSubmit={loginUser} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-full font-semibold transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-medium hover:underline"
            >
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
