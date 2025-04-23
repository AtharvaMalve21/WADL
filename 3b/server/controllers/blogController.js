const Blog = require("../models/blogModel");
const User = require("../models/userModel");

exports.createBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User found",
      });
    }

    const { title, content } = req.body;

    const coverImage = req.file ? req.file.path : "";

    const blog = await Blog.create({
      title,
      content,
      coverImage,
      userId: userId,
    });

    return res.status(201).json({
      success: true,
      data: blog,
      message: "New Blog created",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User found",
      });
    }

    const blog = await Blog.find({ userId: userId })
      .populate("userId")
      .sort({ createdAt: -1 });

      
    return res.status(200).json({
      success: true,
      data: blog,
      message: "Blog data fetched!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.viewBlog = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User found",
      });
    }

    const { id } = req.params;

    const blog = await Blog.findById(id)
      .populate("userId")
      .sort({ createdAt: -1 });

    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "No Blog found",
      });
    }

    return res.status(200).json({
      success: true,
      data: blog,
      message: "Here is your blog post ",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User found",
      });
    }

    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "No Blog found",
      });
    }

    //check if the user is authorized to update this blog
    if (blog.userId._id.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: "User is not authorized to update this blog",
      });
    }

    const { title, description } = req.body;

    const coverImage = req.file ? req.file.path : "";

    blog.title = title || blog.title;
    blog.description = description || blog.description;
    blog.coverImage = coverImage || blog.coverImage;
    await blog.save();

    return res.status(200).json({
      success: true,
      data: blog,
      message: "Blog updated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No User found",
      });
    }

    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(400).json({
        success: false,
        message: "No Blog found",
      });
    }

    //check if the user is authorized to delete this blog
    if (blog.userId._id.toString() !== userId.toString()) {
      return res.status(401).json({
        success: false,
        message: "User is not authorized to delete this blog",
      });
    }

    await Blog.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
