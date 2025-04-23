const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User does not exists",
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
      message: "User profile fetched",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const { name, email, password, gender } = req.body;

    const profilePic = req.file ? req.file.path : "";

    //hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.name = name || user.name;
    user.email = email || user.email;
    user.password = hashedPassword || user.password;
    user.gender = gender || user.gender;
    user.profilePic = profilePic || user.profilePic;
    await user.save();

    return res.status(200).json({
      success: true,
      data: user,
      message: "User profile updated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
