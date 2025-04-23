const express = require("express");
const router = express.Router();

const {
  getSignupPage,
  signup,
  getLoginPage,
  login,
  logout,
} = require("../controllers/authController");

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

router.get("/signup", getSignupPage);

router.post("/signup", upload.single("profilePic"), signup);

router.get("/login", getLoginPage);

router.post("/login", login);

router.get("/logout", auth, logout);

module.exports = router;
