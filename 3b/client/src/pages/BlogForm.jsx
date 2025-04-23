import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();
  const URI = import.meta.env.VITE_BACKEND_URI;

  const handleImageChange = (ev) => {
    const file = ev.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  const addBlog = async (ev) => {
    ev.preventDefault();

    if (!title || !content || !image) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("coverImage", image);

      const { data } = await axios.post(`${URI}/api/blogs`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success("Blog Added Successfully!");
        navigate("/"); // Redirect to home page
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-800 shadow-lg rounded-lg text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Create New Blog</h1>

      <form onSubmit={addBlog} className="space-y-4">
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
            Add Image
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
            <p className="text-gray-400">Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-full h-60 object-cover rounded-lg border border-gray-600"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-semibold"
        >
          Add Blog
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
