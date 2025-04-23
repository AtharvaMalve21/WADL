const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
exports.getSignupPage = (req, res) => {
  res.render("pages/signup.ejs");
};

exports.signup = async (req, res) => {
  try {
    //fetch user details
    const { name, email, password } = req.body;
    const profilePic = req.file.path;

    //validate user details
    if (!name || !email || !password) {
      return res.render("pages/signup.ejs", {
        error: "Please fill in all the required fields.",
      });
    }
    //check for existing user
    const user = await User.findOne({ email });
    if (user) {
      return res.render("pages/signup.ejs", {
        error: "User already exists with this mail id.",
      });
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic,
    });

    //generate cookie
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    console.log(newUser);
    return res.redirect("/");
  } catch (err) {
    res.render("pages/signup.ejs", {
      error: err.message,
    });
  }
};

exports.getLoginPage = (req, res) => {
  res.render("pages/login.ejs");
};

exports.login = async (req, res) => {
  try {
    //fetch user details
    const { email, password } = req.body;

    //validate user details
    if (!email || !password) {
      return res.render("pages/login.ejs", {
        error: "Please fill in all the required fields.",
      });
    }
    //check for existing user
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("pages/login.ejs", {
        error: "User does not exists with this mail id.",
      });
    }

    //check user password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("pages/login.ejs", {
        error: "Invalid Password. Try again.",
      });
    }

    //generate cookie
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "3d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    console.log(user);
    return res.redirect("/");
  } catch (err) {
    res.render("pages/login.ejs", {
      error: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.redirect("/login");
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
