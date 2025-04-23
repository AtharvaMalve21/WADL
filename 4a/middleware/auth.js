const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.render("pages/login.ejs", {
        error: "Access Denied. Login Again.",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedToken._id);
    if (!user) {
      return res.render("pages/login.ejs", {
        error: "User is not authorized. Login Again",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.render("pages/login.ejs", {
      error: err.message,
    });
  }
};
