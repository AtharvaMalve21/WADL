const express = require("express");
const router = express.Router();

const {
  createBlog,
  getBlogs,
  viewBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const { auth } = require("../middleware/auth");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//POST - Create new Blog
router.post("/", upload.single("coverImage"), auth, createBlog);

//GET - Fetch All User Blogs
router.get("/", auth, getBlogs);

//GET - Fetch Single User Blog
router.get("/:id", auth, viewBlog);

//PUT - Update Blog
router.put("/:id", auth, updateBlog);

//DELETE - Delete Blog
router.delete("/:id",auth, deleteBlog);

module.exports = router ;