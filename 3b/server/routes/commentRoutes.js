const express = require("express");
const router = express.Router();

const {
  createComment,
  
  viewComment,
  deleteComment,
} = require("../controllers/commentController");

const { auth } = require("../middleware/auth");

//POST - Create New Comment
router.post("/:id", auth, createComment);


//GET - View Comment
router.get("/:id", auth, viewComment);

//DELETE - Delete Comment
router.delete("/:commentId", auth, deleteComment);

module.exports = router ;
