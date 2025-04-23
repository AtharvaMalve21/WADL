import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { BlogContext } from "../context/BlogContext.jsx";
import { CommentContext } from "../context/CommentContext.jsx";
import { UserContext } from "../context/UserContext.jsx";

const Blogs = () => {
  const { blogs } = useContext(BlogContext);
  const URI = import.meta.env.VITE_BACKEND_URI;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Discover New Stories
      </h1>

      <div className="container mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.length > 0 ? (
          blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/users/blogs/${blog._id}`}
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Blog Cover Image */}
              <img
                src={`${URI}/${blog.coverImage}`}
                alt={blog.title}
                className="w-full h-52 object-cover"
              />

              {/* Blog Content */}
              <div className="p-5">
                <h1 className="text-xl font-semibold mb-2">{blog.title}</h1>
                <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                  {blog.content}
                </p>

                {/* Author and Date */}
                <div className="flex justify-between items-center text-sm text-gray-300">
                  <p>By {blog.userId.name}</p>
                  <p>
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(blog.userId.createdAt))}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 text-lg">
            <h1>No Blogs Available</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
