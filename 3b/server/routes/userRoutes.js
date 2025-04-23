const express = require("express");

const router = express.Router();

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

const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const { auth } = require("../middleware/auth");

router.get("/profile", auth, getUserProfile);
router.put("/profile/:id", upload.single("profilePic"), auth, updateUserProfile);

module.exports = router;
