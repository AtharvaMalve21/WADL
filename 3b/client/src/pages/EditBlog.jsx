import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BlogContext } from "../context/BlogContext.jsx";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

const EditBlog = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { blogs, setBlogs } = useContext(BlogContext);
  const URI = import.meta.env.VITE_BACKEND_URI;
  const { id } = useParams();
  const navigate = useNavigate();

  // State for blog data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {


    const fetchBlogPosts = async () => {
      try {
        const { data } = await axios.get(`${URI}/api/blogs/${id}`, {
          withCredentials: true,
        });

        console.log(data);

        if (data.success) {
          setBlogs(data.data);
          setTitle(data.data?.title || ""); // Use optional chaining and default value
          setContent(data.data?.content || "");
          setPreview(
            data.data?.coverImage ? `${URI}/${data.data.coverImage}` : null
          );
          setLoading(false);
        }
      } catch (err) {
        toast.error(err.response?.data.message || "Failed to fetch blog data.");
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, [isLoggedIn]);

  const handleImageChange = (ev) => {
    const file = ev.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview of new image
    }
  };

  const handleUpdate = async (ev) => {
    ev.preventDefault();

    if (!title || !content) {
      toast.error("Title and Content are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) {
        formData.append("coverImage", image);
      }

      const { data } = await axios.put(`${URI}/api/blogs/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success("Blog Updated Successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data.message || "Failed to update blog.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-300 mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 shadow-lg rounded-lg text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Blog</h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            id="title"
            placeholder="Enter title..."
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block font-medium mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(ev) => setContent(ev.target.value)}
            id="content"
            placeholder="Enter content..."
            rows="4"
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Upload New Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="image"
            className="w-full text-white bg-gray-700 p-2 rounded focus:outline-none"
          />
        </div>

        {/* Image Preview */}
        {preview && (
          <div className="mt-4">
            <p className="text-gray-400">Current Image Preview:</p>
            <img
              src={preview}
              alt="Blog Preview"
              className="w-full h-60 object-cover rounded-lg border border-gray-600"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 transition rounded-lg text-white font-semibold"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
