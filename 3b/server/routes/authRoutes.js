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

const { signup, login, logout } = require("../controllers/authController");

//Register User
router.post("/signup", upload.single("profilePic"), signup);

//Login User
router.post("/login", login);

//Logout User
router.get("/logout", logout);

module.exports = router ;
