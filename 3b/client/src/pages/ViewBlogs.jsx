import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { BlogContext } from "../context/BlogContext";
import { CommentContext } from "../context/CommentContext";
import { toast } from "react-toastify";

const ViewBlogs = () => {
  const { isLoggedIn, user } = useContext(UserContext);
  const { blogs, setBlogs } = useContext(BlogContext);
  const { comments, setComments } = useContext(CommentContext);
  const URI = import.meta.env.VITE_BACKEND_URI;
  const { id } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data } = await axios.get(`${URI}/api/blogs/${id}`, {
          withCredentials: true,
        });
        if (data.success) setBlogs(data.data);
      } catch (err) {
        toast.error(err.response?.data.message);
      }
    };

    const fetchComments = async () => {
      try {
        const { data } = await axios.get(`${URI}/api/blogs/comments/${id}`, {
          withCredentials: true,
        });
        if (data.success) setComments(data.data);
      } catch (err) {
        console.log(err.response?.data.message);
      }
    };

    fetchBlogPosts();
    fetchComments();
  }, [id, isLoggedIn]);

  const createComment = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post(
        `${URI}/api/blogs/comments/${id}`,
        { body: comment },
        { withCredentials: true }
      );
      if (data.success) {
        toast.success(data.message);
        setComments((prev) => [...prev, data.data]);
        setComment("");
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  const deleteComment = async (id) => {
    try {
      console.log(id);

      const { data } = await axios.delete(URI + `/api/blogs/comments/${id}`, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/users/blogs");
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const { data } = await axios.delete(URI + `/api/blogs/${id}`, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/users/blogs");
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{blogs.userId?.name}'s Blog</h1>
      <div className="max-w-3xl bg-gray-800 rounded-lg shadow-lg p-6">
        <img
          src={`${URI}/${blogs?.coverImage}`}
          alt="Blog Cover"
          className="w-full h-64 object-cover rounded-lg"
        />
        <h2 className="text-4xl font-extrabold mt-4">{blogs?.title}</h2>
        <p className="text-gray-300 mt-4 text-lg">{blogs?.content}</p>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={() => navigate(`/users/blogs/${id}/edit`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <button
            onClick={() => deleteBlog(blogs._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Comments</h3>
          <div className="space-y-4 mt-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-4 bg-gray-700 rounded-lg shadow-md border border-gray-600 relative"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={`${URI}/${user.profilePic}`}
                      alt=""
                      className="w-10 h-10 rounded-full border border-gray-500"
                    />
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-sm text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-200 border-t border-gray-600 pt-2">
                    {comment.body}
                  </p>
                  <button
                    onClick={() => deleteComment(comment._id)}
                    className="absolute top-2 right-2 p-1  text-red-600 hover:text-2xl hover:text-red-900 transition"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No comments yet.</p>
            )}
          </div>
        </div>

        <form
          onSubmit={createComment}
          className="mt-6 bg-gray-700 p-4 rounded-lg shadow-lg border border-gray-600"
        >
          <h2 className="text-lg font-semibold text-white">Add a Comment:</h2>
          <input
            type="text"
            value={comment}
            onChange={(ev) => setComment(ev.target.value)}
            placeholder="Write a comment..."
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg mt-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewBlogs;
