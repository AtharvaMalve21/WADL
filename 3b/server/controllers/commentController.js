const User = require("../models/userModel");
const Blog = require("../models/blogModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
  try {
    const userId = req.user._id; //Authenticated user

    const { id } = req.params; // Blog id

    const { body } = req.body;

    if (!body) {
      return res.status(400).json({
        success: false,
        message: "Body field is required",
      });
    }

    //create comment
    const comment = await Comment.create({ body, userId: userId, blogId: id });

    return res.status(201).json({
      success: true,
      data: comment,
      message: "New Comment created",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.viewComment = async (req, res) => {
  try {
    const { id } = req.params; //Blog id

    // Fetch comments related to the blog
    const comment = await Comment.find({ blogId: id })
      .populate("userId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: comment,
      message: "Comment data fetched",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const userId = req.user._id;

    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(400).json({
        success: false,
        message: "No Comment found",
      });
    }

    //check if the user who created a comment can only delete this comment
    if (comment.userId._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your own comments",
      });
    }

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
