import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { BlogContext } from "../context/BlogContext";
import { format } from "date-fns";

const MyBlogs = () => {
  const { isLoggedIn, user } = useContext(UserContext);
  const { blogs, setBlogs } = useContext(BlogContext);

  const URI = import.meta.env.VITE_BACKEND_URI;

  const fetchUserBlogs = async () => {
    try {
      const { data } = await axios.get(`${URI}/api/blogs`, {
        withCredentials: true,
      });

      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.log(err.response?.data.message);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, [isLoggedIn]);

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        {user?.name} Blogs
      </h1>
      {blogs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              to={`/users/blogs/${blog._id}`}
              key={blog._id}
              className="bg-gray-800 shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              {/* Blog Cover Image */}
              <img
                src={`${URI}/${blog.coverImage}`}
                alt="Blog Cover"
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                {/* Blog Title */}
                <h2 className="text-xl font-semibold text-white mb-2 truncate">
                  {blog.title}
                </h2>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={`${URI}/${blog.userId.profilePic}`}
                    alt="Author"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-gray-400 font-medium">
                      {blog.userId.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {format(new Date(blog.createdAt), "MMMM d, yyyy")}
                    </p>
                  </div>
                </div>

                {/* Blog Content Preview */}
                <p className="text-gray-400 mt-3 line-clamp-3">
                  {blog.content}
                </p>

                {/* Read More Button */}
                <div className="mt-4">
                  <span className="text-blue-500 hover:text-blue-400 text-sm font-medium">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">No blogs found.</p>
      )}
    </div>
  );
};

export default MyBlogs;
