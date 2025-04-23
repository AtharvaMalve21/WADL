const User = require("../models/userModel");
const Listings = require("../models/listingsModel");

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.render("pages/login.ejs", {
        error: "User not found. Login Again",
      });
    }

    const listings = await Listings.find({ owner: userId });

    return res.render("pages/profile.ejs", {
      user: user,
      listings: listings,
    });
  } catch (err) {
    res.render("pages/login.ejs", {
      error: err.message,
    });
  }
};
