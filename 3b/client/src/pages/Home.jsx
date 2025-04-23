import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { BlogContext } from "../context/BlogContext";
import axios from "axios";
import { toast } from "react-toastify";
import Blogs from "../components/Blogs";

const Home = () => {
  const { setBlogs } = useContext(BlogContext);

  const URI = import.meta.env.VITE_BACKEND_URI;

  const fetchBlogDetails = async () => {
    try {
      const { data } = await axios.get(URI + "/");

      console.log(data.data);

      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, []);

  return (
    <div className="mt-3">
      <Blogs />
    </div>
  );
};

export default Home;
